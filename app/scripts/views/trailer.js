/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var TrailerView = Backbone.View.extend({
        template: JST['app/scripts/templates/trailer.hbs'],
        player: "<iframe src=\"//player.vimeo.com/video/85258479\" width=\"800\" height=\"450\" frameborder=\"0\" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>",
        initialize: function(){
            this.el = $.parseHTML(this.template());
            this.trailerSet = false;
        },
        render: function(){
            return this.el;
        },
        setActive: function(){
            $(this.el).attr("active", true);
            if(!this.trailerSet){
                var playerTag = $($.parseHTML(this.player));

                //set size
                var w = $(window).width();
                var playerW = Math.round(w * 0.4);
                var playerH = Math.round(playerW / 16 * 9); //16:9

                console.log(playerTag);

                playerTag.attr("width", playerW);
                playerTag.attr("height", playerH);

                $(".playerWrapper").css({
                   "margin-top": -(playerH/2)+"px",
                    "margin-left": -(playerW/2)+"px",
                    "height":playerH+"px",
                    "width":playerW+"px"
                });

                $(".playerWrapper", this.el).append(playerTag);
                this.trailerSet = true;
            }
        }
    });

    return TrailerView;
});
