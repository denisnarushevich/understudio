/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var HomeView = Backbone.View.extend({
        template: JST['app/scripts/templates/home.hbs'],
        initialize: function(){
            this.el = $.parseHTML(this.template());
            var el = this.el;
            $(".steven img", this.el).css({display: "none"});
            $(".steven > img", this.el).load(function(){
                $(".steven img", el).css({display: "block"});
            });
        },
        render: function(){
            var self = this;
            setTimeout(function(){
            $(function(){
                $(".title", self.el).attr("active", true);
            });
            },500);
            return this.el;
        },
        setActive: function(){
            $(this.el).attr("active", true);
        }
    });

    return HomeView;
});
