var app = {

      _window : $(window),
      sections : $('.page-section'),
      stickySections : $('.sticky.page-section'),
      stickyAmount : 0,
      heights : [],
      stickyHeight: 0,
      scrollPositions : [],

      getData : function() {

        for ( var i=0; i < app.sections.length; i++) {

          var thisHeight = $(app.sections[i]).outerHeight(),
            thisPosition = $(app.sections[i]).offset().top;

          app.heights.push( thisHeight );
          app.scrollPositions.push( thisPosition );
        }

      },

      updateStickyHeight : function () {

        app.stickyHeight = 0;

        for ( var i=0; i < app.stickyAmount; i++ ) {

          app.stickyHeight += app.heights[i];
        }
        
        $('body').css({
            'padding-top' : app.stickyHeight
          });

      },

      addSticky : function () {

        app._window.scroll(function(){

          if ( $(window).scrollTop() > app.stickyHeight ) {

            $(app.sections[ app.stickyAmount ]).addClass('sticky');

            app.refreshSticky('plus');

          }
          
        })
      },

      removeSticky : function () {

        app._window.scroll(function(){

          var lastSticky = app.stickySections[app.stickySections.length-1],
            lastStickyPosition = app.scrollPositions[app.stickySections.length-1];

          if ( $(window).scrollTop() < lastStickyPosition && $(window).scrollTop() > 0 ) {

            $(lastSticky).removeClass('sticky');

            app.refreshSticky('minus');
          }

        })

      },

      refreshSticky : function (sum) {
        app.stickySections = $('.sticky.page-section');

        if ( sum === 'plus' ) {
          app.stickyAmount++;
        }
        else if ( sum === 'minus' ) {
          app.stickyAmount--;
        }
        app.updateStickyHeight();
      },

      init: function () {

        app.getData();
        app.addSticky();
        app.removeSticky();
      }
    }
    $(function(){
      app.init();
    })