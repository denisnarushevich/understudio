/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var MenuView = Backbone.View.extend({
        template: JST['app/scripts/templates/menu.hbs'],
        initialize: function () {
            this.el = $.parseHTML(this.template());

            this.$el = $(this.el);

            this.triangle = $(".rail .triangle", this.$el);

            this.currentButton = null;
        },
        render: function () {
            return this.el;
        },
        setActive: function (buttonName) {
              this.triangle.stop(true, true);

            if (buttonName !== "home") {
                var b = $("." + buttonName, this.$el);

                if(!b)
                    return;

                if (this.currentButton !== null)
                    this.currentButton.removeAttr("active");

                this.currentButton = b;
                this.currentButton.attr("active", true);

                var box = this.currentButton.get(0).getBoundingClientRect();
                var centerX = box.left + box.width / 2;

                if (this.triangle.attr("active")) {
                    this.triangle.animate({
                        left: centerX
                    }, {
                        duration: 800
                    });
                }else{
                    this.triangle.attr("active", true);
                    this.triangle.css({left: centerX});
                }
            } else {
                if (this.currentButton !== null)
                    this.currentButton.removeAttr("active");

                this.currentButton = null;
                this.triangle.removeAttr("active");

                this.triangle.css({left: -64});
            }
        }
    });

    return MenuView;
});
