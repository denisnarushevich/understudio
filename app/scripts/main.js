/*global require*/
'use strict';

require.config({
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
        handlebars: {
            exports: 'Handlebars'
        }
    },
    paths: {
        jquery: '../bower_components/jquery/jquery',
        jqueryMobile: '../bower_components/jquery-mobile-requirejs/js/jquery.mobile-1.3.2.min',
        backbone: '../bower_components/backbone/backbone',
        underscore: '../bower_components/underscore/underscore',
        handlebars: '../bower_components/handlebars/handlebars'
    }
});

require([
    'backbone',
    'views/main',
    'routes/main',
], function (Backbone, MainView, MainRouter) {
    var mainView = new MainView(),
        mainRouter = new MainRouter();

    mainView.render();

    mainRouter.on("route:home", function(){
        mainView.show("landing");
    });

    mainRouter.on("route:trailer", function(){
        mainView.show("trailer");
    });

    mainRouter.on("route:chars", function(){
        mainView.show("chars");
    });

    mainRouter.on("route:process", function(){
        mainView.show("process");
    });

    mainRouter.on("route:contacts", function(){
        mainView.show("contacts");
    });

    Backbone.history.start();





    var rolling = false;
    var rollingAmount = 0;
    var timer = null;


    // creates a global "addWheelListener" method
// example: addWheelListener( elem, function( e ) { console.log( e.deltaY ); e.preventDefault(); } );
    (function(window,document) {

        var prefix = "", _addEventListener, onwheel, support;

        // detect event model
        if ( window.addEventListener ) {
            _addEventListener = "addEventListener";
        } else {
            _addEventListener = "attachEvent";
            prefix = "on";
        }

        // detect available wheel event
        support = "onwheel" in document.createElement("div") ? "wheel" : // Modern browsers support "wheel"
            document.onmousewheel !== undefined ? "mousewheel" : // Webkit and IE support at least "mousewheel"
                "DOMMouseScroll"; // let's assume that remaining browsers are older Firefox

        window.addWheelListener = function( elem, callback, useCapture ) {
            _addWheelListener( elem, support, callback, useCapture );

            // handle MozMousePixelScroll in older Firefox
            if( support == "DOMMouseScroll" ) {
                _addWheelListener( elem, "MozMousePixelScroll", callback, useCapture );
            }
        };

        function _addWheelListener( elem, eventName, callback, useCapture ) {
            elem[ _addEventListener ]( prefix + eventName, support == "wheel" ? callback : function( originalEvent ) {
                !originalEvent && ( originalEvent = window.event );

                // create a normalized event object
                var event = {
                    // keep a ref to the original event object
                    originalEvent: originalEvent,
                    target: originalEvent.target || originalEvent.srcElement,
                    type: "wheel",
                    deltaMode: originalEvent.type == "MozMousePixelScroll" ? 0 : 1,
                    deltaX: 0,
                    delatZ: 0,
                    preventDefault: function() {
                        originalEvent.preventDefault ?
                            originalEvent.preventDefault() :
                            originalEvent.returnValue = false;
                    }
                };

                // calculate deltaY (and deltaX) according to the event
                if ( support == "mousewheel" ) {
                    event.deltaY = - 1/40 * originalEvent.wheelDelta;
                    // Webkit also support wheelDeltaX
                    originalEvent.wheelDeltaX && ( event.deltaX = - 1/40 * originalEvent.wheelDeltaX );
                } else {
                    event.deltaY = originalEvent.detail;
                }

                // it's time to fire the callback
                return callback( event );

            }, useCapture || false );
        }

    })(window,document);


    window.blockScroll = false;
    addWheelListener( document.body, function( e ) {
        if(window.blockScroll)
            return true;

        if(!rolling){
            rolling = true;

            if(timer !== null)
                clearTimeout(timer);

            timer = setTimeout(function(){
                rolling = false;
                rollingAmount = 0;
            }, 1000);
        }else{
            rollingAmount += (e.deltaY > 0 ? 100 : -100);
            if(Math.abs(rollingAmount) > 200){
                clearTimeout(timer);
                timer = null;
                rolling = false;
                if(rollingAmount > 0){
                    mainView.showNext();
                }else{
                    mainView.showPrev();
                }
                rollingAmount = 0;
            }
        }
    });
});
