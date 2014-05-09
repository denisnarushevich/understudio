/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var CharsView = Backbone.View.extend({
        template: JST['app/scripts/templates/chars.hbs'],
        initialize: function(){
            this.el = $.parseHTML(this.template());
            this.$el = $(this.el);
            this.current = null;
            var self = this;
            $(".charIcons .item", this.el).click(function(){
               self.switch($(this).attr("key"));
            });

            $(".char > .text", this.el).hover(function(e){
                window.blockScroll = true;
            }, function(e){
                window.blockScroll = false;
            });
        },
        render: function(){
            this.switch("steven");
            return this.el;
        },
        switch: function(key){
            if(this.current)
                this.current.removeAttr("active");

            this.current = $("."+key, this.$el);
            this.current.attr("active", true);
        },
        setActive: function(){
            $(this.el).attr("active", true);
        }
    });

    return CharsView;
});
