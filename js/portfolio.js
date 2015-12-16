// Declare namespace.
YAHOO.namespace("YAHOO.m5n");

// Singleton pattern.
YAHOO.m5n.portfolio = (function() {
    //
    // Private variables
    //
    var isExpanded = {};
    var timerId = null;
    var currentSlide = -1;
    var currentView = 0;   // 0 == Main
    var animEasingOptions = [
        //YAHOO.util.Easing.backBoth,
        //YAHOO.util.Easing.backIn,
        //YAHOO.util.Easing.backOut,
        YAHOO.util.Easing.bounceBoth,
        YAHOO.util.Easing.bounceIn,
        YAHOO.util.Easing.bounceOut//,
        //YAHOO.util.Easing.easeBoth,
        //YAHOO.util.Easing.easeBothStrong,
        //YAHOO.util.Easing.easeIn,
        //YAHOO.util.Easing.easeInStrong,
        //YAHOO.util.Easing.easeNone,
        //YAHOO.util.Easing.easeOut,
        //YAHOO.util.Easing.easeOutStrong//,
        // The elastic ones are too busy.
        //YAHOO.util.Easing.elasticBoth,
        //YAHOO.util.Easing.elasticIn,
        //YAHOO.util.Easing.elasticOut
    ];
    var galleryPieces = {
        0: [
            {
                url: "images/preview_slideshow/03_bark3.jpg",
                // The "see" key refers to another item in this object.
                see: "[1][2]"
            },
            {
                url: "images/preview_slideshow/06_green.jpg",
                see: "[1][5]"
            },
            {
                url: "images/preview_slideshow/05_charcoal.jpg",
                see: "[1][4]"
            },
            {
                url: "images/preview_slideshow/13_table.jpg",
                see: "[1][12]"
            },
            {
                url: "images/preview_slideshow/12_brick.jpg",
                see: "[1][11]"
            },
            {
                url: "images/preview_slideshow/01_bark.jpg",
                see: "[1][0]"
            },
            {
                url: "images/preview_slideshow/08_purple.jpg",
                see: "[1][7]"
            },
            {
                url: "images/preview_slideshow/07_raindrops.jpg",
                see: "[1][6]"
            },
            {
                url: "images/preview_slideshow/04_wood.jpg",
                see: "[1][3]"
            },
            {
                url: "images/preview_slideshow/02_bark2.jpg",
                see: "[1][1]"
            },
            {
                url: "images/preview_slideshow/09_stone.jpg",
                see: "[1][8]"
            },
            {
                url: "images/preview_slideshow/10_multi.jpg",
                see: "[1][9]"
            },
            {
                url: "images/preview_slideshow/11_rug.jpg",
                see: "[1][10]"
            }
        ],
        1: [
            {
                url: "images/thumbnails/thumbs_photos/01t_bark.jpg",
                thumb: "bark with sap",
                title: "&quot;Bark with Sap&quot;",
                descr: " ",
                clickurl: "images/photos/01_bark.jpg",
                img_w: 455,
                img_h: 341
            },
            {
                url: "images/thumbnails/thumbs_photos/02t_bark2.jpg",
                thumb: "bark with sprig",
                title: "&quot;Bark with Sprig&quot;",
                descr: " ",
                clickurl: "images/photos/02_bark2.jpg",
                img_w: 455,
                img_h: 341
            },
            {
                url: "images/thumbnails/thumbs_photos/03t_bark3.jpg",
                thumb: "bark with cut",
                title: "&quot;Bark with Cut&quot;",
                descr: " ",
                clickurl: "images/photos/03_bark3.jpg",
                img_w: 341,
                img_h: 455
            },
            {
                url: "images/thumbnails/thumbs_photos/04t_wood.jpg",
                thumb: "wooden table",
                title: "&quot;Wooden Table&quot;",
                descr: " ",
                clickurl: "images/photos/04_wood.jpg",
                img_w: 455,
                img_h: 341
            },
            {
                url: "images/thumbnails/thumbs_photos/05t_charcoal.jpg",
                thumb: "burnt charcoal",
                title: "Burnt Charcoal",
                descr: " ",
                clickurl: "images/photos/05_charcoal.jpg",
                img_w: 455,
                img_h: 341
            },
            {
                url: "images/thumbnails/thumbs_photos/06t_green.jpg",
                thumb: "lotsa green",
                title: "&quot;Lotsa Green&quot;",
                descr: " ",
                clickurl: "images/photos/06_green.jpg",
                img_w: 455,
                img_h: 341
            },
            {
                url: "images/thumbnails/thumbs_photos/07t_raindrops.jpg",
                thumb: "raindrops",
                title: "&quot;Raindrops&quot;",
                descr: " ",
                clickurl: "images/photos/07_raindrops.jpg",
                img_w: 455,
                img_h: 341
            },
            {
                url: "images/thumbnails/thumbs_photos/08t_purple.jpg",
                thumb: "purple blanket",
                title: "&quot;Purple Blanket&quot;",
                descr: " ",
                clickurl: "images/photos/08_purple.jpg",
                img_w: 455,
                img_h: 341
            },
            {
                url: "images/thumbnails/thumbs_photos/09t_stone.jpg",
                thumb: "stone",
                title: "&quot;Stone&quot;",
                descr: " ",
                clickurl: "images/photos/09_stone.jpg",
                img_w: 455,
                img_h: 341
            },
            {
                url: "images/thumbnails/thumbs_photos/10t_multi.jpg",
                thumb: "multi-colored blanket",
                title: "&quot;Multi-colored Blanket&quot;",
                descr: " ",
                clickurl: "images/photos/10_multi.jpg",
                img_w: 455,
                img_h: 341
            },
            {
                url: "images/thumbnails/thumbs_photos/11t_rug.jpg",
                thumb: "vinyl rug",
                title: "&quot;Vinyl Rug&quot;",
                descr: " ",
                clickurl: "images/photos/11_rug.jpg",
                img_w: 455,
                img_h: 341
            },
            {
                url: "images/thumbnails/thumbs_photos/12t_brick.jpg",
                thumb: "brick",
                title: "&quot;Brick&quot;",
                descr: " ",
                clickurl: "images/photos/12_brick.jpg",
                img_w: 455,
                img_h: 341
            },
            {
                url: "images/thumbnails/thumbs_photos/13t_table.jpg",
                thumb: "red table",
                title: "&quot;Red Table&quot;",
                descr: " ",
                clickurl: "images/photos/13_table.jpg",
                img_w: 455,
                img_h: 341
            }
        ],
        2: [
          {
              url: "images/thumbnails/thumbs_photos/04t_wood.jpg",
              thumb: "wooden table",
              title: "&quot;Wooden Table&quot;",
              descr: " ",
              clickurl: "images/photos/04_wood.jpg",
              img_w: 455,
              img_h: 341
          },
          {
              url: "images/thumbnails/thumbs_photos/05t_charcoal.jpg",
              thumb: "burnt charcoal",
              title: "Burnt Charcoal",
              descr: " ",
              clickurl: "images/photos/05_charcoal.jpg",
              img_w: 455,
              img_h: 341
          },
          {
              url: "images/thumbnails/thumbs_photos/06t_green.jpg",
              thumb: "lotsa green",
              title: "&quot;Lotsa Green&quot;",
              descr: " ",
              clickurl: "images/photos/06_green.jpg",
              img_w: 455,
              img_h: 341
          },
          {
              url: "images/thumbnails/thumbs_photos/07t_raindrops.jpg",
              thumb: "raindrops",
              title: "&quot;Raindrops&quot;",
              descr: " ",
              clickurl: "images/photos/07_raindrops.jpg",
              img_w: 455,
              img_h: 341
          },
          {
              url: "images/thumbnails/thumbs_photos/08t_purple.jpg",
              thumb: "purple blanket",
              title: "&quot;Purple Blanket&quot;",
              descr: " ",
              clickurl: "images/photos/08_purple.jpg",
              img_w: 455,
              img_h: 341
          },
          {
              url: "images/thumbnails/thumbs_photos/09t_stone.jpg",
              thumb: "stone",
              title: "&quot;Stone&quot;",
              descr: " ",
              clickurl: "images/photos/09_stone.jpg",
              img_w: 455,
              img_h: 341
          },
          {
              url: "images/thumbnails/thumbs_photos/10t_multi.jpg",
              thumb: "multi-colored blanket",
              title: "&quot;Multi-colored Blanket&quot;",
              descr: " ",
              clickurl: "images/photos/10_multi.jpg",
              img_w: 455,
              img_h: 341
          },
          {
              url: "images/thumbnails/thumbs_photos/11t_rug.jpg",
              thumb: "vinyl rug",
              title: "&quot;Vinyl Rug&quot;",
              descr: " ",
              clickurl: "images/photos/11_rug.jpg",
              img_w: 455,
              img_h: 341
          },
          {
              url: "images/thumbnails/thumbs_photos/12t_brick.jpg",
              thumb: "brick",
              title: "&quot;Brick&quot;",
              descr: " ",
              clickurl: "images/photos/12_brick.jpg",
              img_w: 455,
              img_h: 341
          },
          {
              url: "images/thumbnails/thumbs_photos/13t_table.jpg",
              thumb: "red table",
              title: "&quot;Red Table&quot;",
              descr: " ",
              clickurl: "images/photos/13_table.jpg",
              img_w: 455,
              img_h: 341
          }
        ],
        3: [
          {
              url: "images/thumbnails/thumbs_photos/05t_charcoal.jpg",
              thumb: "burnt charcoal",
              title: "Burnt Charcoal",
              descr: " ",
              clickurl: "images/photos/05_charcoal.jpg",
              img_w: 455,
              img_h: 341
          },
          {
              url: "images/thumbnails/thumbs_photos/07t_raindrops.jpg",
              thumb: "raindrops",
              title: "&quot;Raindrops&quot;",
              descr: " ",
              clickurl: "images/photos/07_raindrops.jpg",
              img_w: 455,
              img_h: 341
          },
          {
              url: "images/thumbnails/thumbs_photos/09t_stone.jpg",
              thumb: "stone",
              title: "&quot;Stone&quot;",
              descr: " ",
              clickurl: "images/photos/09_stone.jpg",
              img_w: 455,
              img_h: 341
          },
          {
              url: "images/thumbnails/thumbs_photos/11t_rug.jpg",
              thumb: "vinyl rug",
              title: "&quot;Vinyl Rug&quot;",
              descr: " ",
              clickurl: "images/photos/11_rug.jpg",
              img_w: 455,
              img_h: 341
          },
          {
              url: "images/thumbnails/thumbs_photos/12t_brick.jpg",
              thumb: "brick",
              title: "&quot;Brick&quot;",
              descr: " ",
              clickurl: "images/photos/12_brick.jpg",
              img_w: 455,
              img_h: 341
          }
        ],
        4: [
          {
              url: "images/thumbnails/thumbs_photos/03t_bark3.jpg",
              thumb: "bark with cut",
              title: "&quot;Bark with Cut&quot;",
              descr: " ",
              clickurl: "images/photos/03_bark3.jpg",
              img_w: 341,
              img_h: 455
            },
            {
                url: "images/thumbnails/thumbs_photos/13t_table.jpg",
                thumb: "red table",
                title: "&quot;Red Table&quot;",
                descr: " ",
                clickurl: "images/photos/13_table.jpg",
                img_w: 455,
                img_h: 341
          },
          {
              url: "images/thumbnails/thumbs_photos/04t_wood.jpg",
              thumb: "wooden table",
              title: "&quot;Wooden Table&quot;",
              descr: " ",
              clickurl: "images/photos/04_wood.jpg",
              img_w: 455,
              img_h: 341
          },
          {
              url: "images/thumbnails/thumbs_photos/08t_purple.jpg",
              thumb: "purple blanket",
              title: "&quot;Purple Blanket&quot;",
              descr: " ",
              clickurl: "images/photos/08_purple.jpg",
              img_w: 455,
              img_h: 341
          },
          {
              url: "images/thumbnails/thumbs_photos/09t_stone.jpg",
              thumb: "stone",
              title: "&quot;Stone&quot;",
              descr: " ",
              clickurl: "images/photos/09_stone.jpg",
              img_w: 455,
              img_h: 341
          },
          {
              url: "images/thumbnails/thumbs_photos/06t_green.jpg",
              thumb: "lotsa green",
              title: "&quot;Lotsa Green&quot;",
              descr: " ",
              clickurl: "images/photos/06_green.jpg",
              img_w: 455,
              img_h: 341
          },
          {
              url: "images/thumbnails/thumbs_photos/07t_raindrops.jpg",
              thumb: "raindrops",
              title: "&quot;Raindrops&quot;",
              descr: " ",
              clickurl: "images/photos/07_raindrops.jpg",
              img_w: 455,
              img_h: 341
          },
          {
              url: "images/thumbnails/thumbs_photos/01t_bark.jpg",
              thumb: "bark with sap",
              title: "&quot;Bark with Sap&quot;",
              descr: " ",
              clickurl: "images/photos/01_bark.jpg",
              img_w: 455,
              img_h: 341
          },
          {
              url: "images/thumbnails/thumbs_photos/05t_charcoal.jpg",
              thumb: "burnt charcoal",
              title: "Burnt Charcoal",
              descr: " ",
              clickurl: "images/photos/05_charcoal.jpg",
              img_w: 455,
              img_h: 341
          },
          {
              url: "images/thumbnails/thumbs_photos/02t_bark2.jpg",
              thumb: "bark with sprig",
              title: "&quot;Bark with Sprig&quot;",
              descr: " ",
              clickurl: "images/photos/02_bark2.jpg",
              img_w: 455,
              img_h: 341
          },
          {
              url: "images/thumbnails/thumbs_photos/10t_multi.jpg",
              thumb: "multi-colored blanket",
              title: "&quot;Multi-colored Blanket&quot;",
              descr: " ",
              clickurl: "images/photos/10_multi.jpg",
              img_w: 455,
              img_h: 341
          },
          {
              url: "images/thumbnails/thumbs_photos/11t_rug.jpg",
              thumb: "vinyl rug",
              title: "&quot;Vinyl Rug&quot;",
              descr: " ",
              clickurl: "images/photos/11_rug.jpg",
              img_w: 455,
              img_h: 341
          },
          {
              url: "images/thumbnails/thumbs_photos/12t_brick.jpg",
              thumb: "brick",
              title: "&quot;Brick&quot;",
              descr: " ",
              clickurl: "images/photos/12_brick.jpg",
              img_w: 455,
              img_h: 341
          }
        ],
        5: [
        ]
    };



    //
    // Private functions
    //
    function _showSlide() {
        // Fade out current image.
        var anim = new YAHOO.util.Anim('slideshow', {
            opacity: { from: 1, to: 0 }
        }, 0.5);
        anim.onComplete.subscribe(function() {
            currentSlide = (currentSlide + 1) % galleryPieces[0].length;
            var slideHolder = YAHOO.util.Dom.get('slideshow');
            slideHolder.style.backgroundImage = "url('" + galleryPieces[0][currentSlide].url + "')";

            // Fade in new image.
            anim = new YAHOO.util.Anim('slideshow', {
                opacity: { from: 0, to: 1 }
            }, 0.5);
            anim.animate();
        });
        anim.animate();

        // Load the next slide.
        var nextSlide = (currentSlide + 1) % galleryPieces[0].length;
        var img = new Image();
        img.src = galleryPieces[0][nextSlide].url;   // Load.
    }

    function _expandTabContent(tabNum) {
        //YAHOO.util.Dom.replaceClass('tabcontent'+tabNum, 'tabcontent', 'sel_tabcontent');
        YAHOO.util.Dom.setStyle('tabcontent'+tabNum, 'visibility', 'visible');
        YAHOO.util.Dom.setStyle('tabtopcorner'+tabNum, 'visibility', 'visible');

        // Active tabs should be above everything, even .header3.
        YAHOO.util.Dom.setStyle('tab'+tabNum, 'z-index', 600);

        var anim = new YAHOO.util.Anim('tabcontent'+tabNum, {
            opacity: { from: 0, to: 0.9 }
        }, 0.25);
        anim.animate();

        anim = new YAHOO.util.Anim('tabtopcorner'+tabNum, {
            opacity: { from: 0, to: 0.9 }
        }, 0.25);
        anim.animate();
    }

    function _resetTabContent(tabNum) {
        //YAHOO.util.Dom.replaceClass('tabcontent'+tabNum, 'sel_tabcontent', 'tabcontent');

        var anim = new YAHOO.util.Anim('tabcontent'+tabNum, {
            opacity: { from: 0.9, to: 0 }
        }, 0.25);
        anim.onComplete.subscribe(function() {
            YAHOO.util.Dom.setStyle('tabcontent'+tabNum, 'visibility', 'hidden');

            // Non-active tabs should be at default level.
            YAHOO.util.Dom.setStyle('tab'+tabNum, 'z-index', 100);
        });
        anim.animate();

        anim = new YAHOO.util.Anim('tabtopcorner'+tabNum, {
            opacity: { from: 0.9, to: 0 }
        }, 0.25);
        anim.onComplete.subscribe(function() {
            YAHOO.util.Dom.setStyle('tabtopcorner'+tabNum, 'visibility', 'hidden');
        });
        anim.animate();
    }

    function _expandTabDivider(tabNum) {
        YAHOO.util.Dom.replaceClass('tabdivider'+tabNum, 'tabdivider', 'sel_tabdivider');
    }

    function _resetTabDivider(tabNum) {
        YAHOO.util.Dom.replaceClass('tabdivider'+tabNum, 'sel_tabdivider', 'tabdivider');
    }

    function _expandTabBase(tabNum) {
        //YAHOO.util.Dom.replaceClass('tabbase'+tabNum, 'tabbase', 'sel_tabbase');

        var anim = new YAHOO.util.Anim('tabbase'+tabNum, {
            height: { to: 65 }
        }, 0.25, YAHOO.util.Easing.easeOut);
        anim.animate();
    }

    function _resetTabBase(tabNum) {
        //YAHOO.util.Dom.replaceClass('tabbase'+tabNum, 'sel_tabbase', 'tabbase');

        var anim = new YAHOO.util.Anim('tabbase'+tabNum, {
            height: { to: 31 }
        }, 0.75, YAHOO.util.Easing.easeOut);
        anim.animate();
    }

    function startSlideShow() {
        // Start slide show.
        timerId = setInterval(YAHOO.m5n.portfolio.showSlide, 6000);
    }

    function stopSlideShow() {
        if (null != timerId) {
            // Stop current slideshow.
            clearInterval(timerId);
            timerId = null;
        }
    }

    function closeOverlay(e) {
        YAHOO.m5n.portfolio.overlay.hide();
    }

    function showOverlayForSlideShow(e) {
        if (-1 != currentSlide) {
            var piece = eval("galleryPieces" + galleryPieces[0][currentSlide].see);
            showOverlayForPiece(piece);
        }
    }

    function showOverlay(e, piece) {
        // TODO: remove special handling; integrate with new portfolio.
        if (4 == currentView) {
            var playgroundUrls = {
                0: "http://tenhanna.com/m5n/design_playground/ued_gallery/02_dnd/dnd.html",
                1: "http://tenhanna.com/m5n/design_playground/ued_gallery/01_slider/slider.html",
                2: "http://m5n.wordpress.com/"
            };
            window.location = playgroundUrls[piece];
            return;
        }

        showOverlayForPiece(galleryPieces[currentView][piece]);
    }

    function showOverlayForPiece(piece) {
        YAHOO.m5n.portfolio.overlay.setHeader(piece.title);

        var imgLink = YAHOO.util.Dom.get('overlayCloser');
        imgLink.innerHTML = '<img src="' + piece.clickurl + '" alt="' + piece.thumb + '" />';

        var descr = YAHOO.util.Dom.get('overlayDescription');
        descr.innerHTML = '';
        if (piece.descr) {
            descr.innerHTML = piece.descr;
        }

        YAHOO.m5n.portfolio.overlay.render(document.body);

        // The wxh are that of the img, so add some space for the text.
        var textWidth = 400;
        var textHeight = 100;
        YAHOO.m5n.portfolio.overlay.cfg.setProperty(
                "width", Math.max(textWidth, 20 + piece.img_w) + "px");
        YAHOO.m5n.portfolio.overlay.cfg.setProperty(
                "height", (textHeight + 20 + piece.img_h) + "px");

        YAHOO.m5n.portfolio.overlay.center();
        YAHOO.m5n.portfolio.overlay.show();
    }

    function expandTab(e, tabNum) {
        if (!isExpanded[tabNum])
        {
            isExpanded[tabNum] = true;
            _expandTabContent(tabNum);
            _expandTabDivider(tabNum);
            _expandTabBase(tabNum);
        }
    }

    function resetTab(e, tabNum) {
        var target = YAHOO.util.Event.getRelatedTarget(e);
        if (isExpanded[tabNum]
                && target
                && target.id != 'tabcontent'+tabNum
                && target.id != 'tabdivider'+tabNum
                && target.id != 'tabbase'+tabNum
                && target.id != 'link'+tabNum
                && target.id != 'switchTab'+tabNum)
        {
            isExpanded[tabNum] = false;
            _resetTabContent(tabNum);
            if (currentView != tabNum) {
                _resetTabDivider(tabNum);
                _resetTabBase(tabNum);
            }
        }
    }

    function switchToTab(e, tabNum) {
        if (currentView == tabNum) {
            return;
        }

        // Reset tab.
        _resetTabContent(tabNum);
        // Show the user which tab is selected.
        //_resetTabDivider(tabNum);
        //_resetTabBase(tabNum);

        // Reset previous tab.
        _resetTabDivider(currentView);
        _resetTabBase(currentView);

        if (0 == currentView) {
            stopSlideShow();

            var ssX = YAHOO.util.Dom.getX('slideshow');
            var ssY = YAHOO.util.Dom.getY('slideshow');

            // Move slideshow pane out of view to the left.
            var anim = new YAHOO.util.Motion('slideshow', { points: { to: [ssX - 1300, ssY] } }, 1, YAHOO.util.Easing.easeIn);
            anim.onComplete.subscribe(function() {
                // Move slideshow pane back into view from the right.
                clearSplashImage();

                var anim = new YAHOO.util.Motion('slideshow', { points: { from: [ssX + 1300, ssY], to: [ssX, ssY] } }, 1, YAHOO.util.Easing.easeOut);
                anim.onComplete.subscribe(function() {
                    dropGalleryPieces(tabNum);
                });
                anim.animate();
            });
            anim.animate();
        }
        else {
            replaceGallery(currentView, tabNum);
        }

        currentView = tabNum;
    }

    function replaceGallery(currentView, tabNum) {
        // Wait until the current gallery is cleared before showing the new one.
        // This means we cannot just call clearGallery(currentView).
        //clearGallery(currentView);
        for (var pp = 1; pp <= galleryPieces[currentView].length; pp++) {
            clearPiece(pp);
        }
        // Always clear the back button.
        //clearPiece(16);
        var anim = new YAHOO.util.Motion('p16', { points: { to: [YAHOO.util.Dom.getX('p16'), -200] } }, 0.5, YAHOO.util.Easing.easeIn);
        anim.onComplete.subscribe(function() {
            dropGalleryPieces(tabNum);
        });
        anim.animate();
    }

    function clearGallery(tabNum) {
        for (var pp = 1; pp <= galleryPieces[tabNum].length; pp++) {
            clearPiece(pp);
        }
        // Always clear the back button.
        clearPiece(16);
    }

    function clearPiece(pp) {
        var anim = new YAHOO.util.Motion('p'+pp, { points: { to: [YAHOO.util.Dom.getX('p'+pp), -200] } }, 0.5, YAHOO.util.Easing.easeIn);
        anim.animate();
    }

    function dropGalleryPieces(tabNum) {
        // Make the gallery pieces fall from the sky.
        for (var pp = 1; pp <= galleryPieces[tabNum].length; pp++) {
            var piece = YAHOO.util.Dom.get('p'+pp);
            piece.style.backgroundImage = "url('" + galleryPieces[tabNum][pp - 1].url + "')";

            var text = YAHOO.util.Dom.get('pp'+pp);
            text.innerHTML = galleryPieces[tabNum][pp - 1].thumb;

            dropPiece(pp);
        }
        // Always drop the back button.
        dropPiece(16);
    }

    function dropPiece(pp) {
        var rnd = Math.round(Math.random() * animEasingOptions.length);
        var easing = animEasingOptions[rnd];
        var yy = (pp % 2 == 0) ? 293 : 128;
        var anim = new YAHOO.util.Motion('p'+pp, { points: { to: [YAHOO.util.Dom.getX('p'+pp), yy] } }, 0.5 + rnd/10, easing);
        anim.animate();
    }

    function switchToHome(e) {
        clearGallery(currentView);
        _resetTabDivider(currentView);
        _resetTabBase(currentView);

        var ssX = YAHOO.util.Dom.getX('slideshow');
        var ssY = YAHOO.util.Dom.getY('slideshow');

        // Move slideshow pane out of view to the left.
        var anim = new YAHOO.util.Motion('slideshow', { points: { to: [ssX - 1300, ssY] } }, 1, YAHOO.util.Easing.easeIn);
        anim.onComplete.subscribe(function() {
            _showSlide();

            // A 1 second transition here makes the image fade in too late.  Give it more time.
            var anim = new YAHOO.util.Motion('slideshow', { points: { from: [ssX + 1300, ssY], to: [ssX, ssY] } }, 1.5, YAHOO.util.Easing.easeOut);
            anim.onComplete.subscribe(function() {
                startSlideShow();
            });
            anim.animate();
        });
        anim.animate();

        currentView = 0;
    }

    function init2() {
        var tabNum;
        for (tabNum = 1; tabNum <= 5; tabNum++) {
            // Workaround for IE7 issue; see comment in CSS for .tabcontent.
            YAHOO.util.Dom.setStyle('tabcontent'+tabNum, 'opacity', 0);
            YAHOO.util.Dom.setStyle('tabcontent'+tabNum, 'visibility', 'visible');

            // Workaround for IE7 issue; see comment in CSS for .top-roundedcorner.
            YAHOO.util.Dom.setStyle('tabtopcorner'+tabNum, 'opacity', 0);
            YAHOO.util.Dom.setStyle('tabtopcorner'+tabNum, 'visibility', 'visible');

            // Detect the expandTab events.
            YAHOO.util.Event.addListener(['tabbase'+tabNum, 'tabdivider'+tabNum], 'mouseover', expandTab, tabNum);

            // Detect the resetTab events.
            YAHOO.util.Event.addListener(['tabbase'+tabNum, 'tabdivider'+tabNum, 'tabcontent'+tabNum], 'mouseout', resetTab, tabNum);

            // Detect tab change events.
            if (5 != tabNum) {   // Except for contact info.
                YAHOO.util.Event.addListener(['tabbase'+tabNum, 'switchTab'+tabNum], 'click', switchToTab, tabNum);
            }

            // Init isExpanded value.
            isExpanded[tabNum] = false;
        }

        var tabPreviewOrder = [1, 2, 3, 4, 5];
        for (var tt = 0; tt < tabPreviewOrder.length; tt++) {
            tabNum = tabPreviewOrder[tt];
            var delay = (tt + 1) * 200;
            // Show the user this functionality.
            setTimeout(
                    "YAHOO.m5n.portfolio.expandTabContent("+tabNum+");" +
                    "YAHOO.m5n.portfolio.expandTabDivider("+tabNum+");" +
                    "YAHOO.m5n.portfolio.expandTabBase("+tabNum+");", delay);
            setTimeout(
                    "YAHOO.m5n.portfolio.resetTabContent("+tabNum+");" +
                    "YAHOO.m5n.portfolio.resetTabDivider("+tabNum+");" +
                    "YAHOO.m5n.portfolio.resetTabBase("+tabNum+");", delay + 400);
        }

        YAHOO.util.Event.addListener('slideshow', 'click', showOverlayForSlideShow);

        // Initialize the overlay.
        YAHOO.m5n.portfolio.overlay =
                new YAHOO.widget.Panel("overlay",
                            { width:"100px",
                              height:"100px",
                              fixedcenter:true,
                              close:true,
                              draggable:false,
                              zindex:500,
                              modal:true,
                              effect:{effect:YAHOO.widget.ContainerEffect.FADE,duration:0.25},
                              visible:false
                            }
                );
        // Add overlay users.
        for (var pp = 1; pp <= 15; pp++) {   // Skip back button!
            YAHOO.util.Event.addListener('p'+pp, 'click', showOverlay, pp - 1);
        }
        // Close the overlay on click.
        YAHOO.util.Event.addListener('overlayCloser', 'click', closeOverlay);

        // Detect home button events.
        YAHOO.util.Event.addListener('p16', 'click', switchToHome);

        // Load the first image.  Subsequent images are loaded in _showSlide().
        var img = new Image();
        img.src = galleryPieces[0][0].url;   // Load.

        startSlideShow();
    }

    function setSplashImage() {
        var slideHolder = YAHOO.util.Dom.get('slideshow');
        slideHolder.style.backgroundImage = "url('images/preview_slideshow/00_m5n.jpg')";
    }

    function clearSplashImage() {
        var slideHolder = YAHOO.util.Dom.get('slideshow');
        slideHolder.style.backgroundImage = '';
    }



    // Return publicly accessible variables and functions.
    return {
        //
        // Public functions
        // (These access private variables and functions through "closure".)
        //

        // These functions are public only because of setInterval/setTimeout.
        showSlide: function() {
            _showSlide();
        },
        expandTabContent: function(tabNum) {
            _expandTabContent(tabNum);
        },
        resetTabContent: function(tabNum) {
            _resetTabContent(tabNum);
        },
        expandTabDivider: function(tabNum) {
            _expandTabDivider(tabNum);
        },
        resetTabDivider: function(tabNum) {
            _resetTabDivider(tabNum);
        },
        expandTabBase: function(tabNum) {
            _expandTabBase(tabNum);
        },
        resetTabBase: function(tabNum) {
            _resetTabBase(tabNum);
        },

        // Kickstart function.
        init: function() {
            // Load the main image before calling the real init().
            var img = new Image();
            img.onload = function() {
                setSplashImage();
                init2();
            };
            img.src = 'images/preview_slideshow/00_m5n.jpg';   // Load.
        }
    };
})();
// End singleton pattern.
