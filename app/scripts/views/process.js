/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var ProcessView = Backbone.View.extend({
        template: JST['app/scripts/templates/process.hbs'],
        initialize: function(){
            this.el = $.parseHTML(this.template());
            this.i = [
                ["1-1.jpg", "1-2.jpg", "1-3.jpg"],
                ["2-1.jpg", "2-2.jpg", "2-3.jpg"],
                ["3-1.jpg", "3-2.jpg", "3-3.jpg"],
                ["4-1.jpg", "4-2.jpg", "4-3.jpg"],
                ["5-1.jpg", "5-2.jpg", "5-3.jpg"]
            ];
            this.r = {};
            this.p = {};
            this.currentCat = 0;
            this.currentImg = 0;
            this.screen = $(".screen", this.el);

            var self = this;
            $(".sets a", this.el).click(function(){
                var key = $(this).attr("key");
                self.cat(key);
            });
            $(".stages a", this.el).click(function(){
                var key = $(this).attr("key");
                self.img(key);
            });
        },
        render: function(){
            this.loadCat(0);
            this.cat(0);
            return this.el;
        },
        loadCat: function(num){
            for(var i = 0; i < 3; i++){
                var name = this.i[num][i];
                if(!this.r[name]){
                    var img = new Image();
                    img.src = "photos/"+name;
                    this.r[name] = img;
                    this.p[name] = img;
                    this.screen.append(img);
                }
            }
        },
        file: function(name){
            if(this.r[name])
                return this.r[name];
            else{
                var img = new Image();
                img.src = "photos/"+name;
                return this.r[name] = img;
            }
        },
        cat: function(num){
            this.currentCat = num;
            this.img(0);
            $(".sets a", this.el).removeAttr("active");
            $(".sets a[key="+num+"]", this.el).attr("active", true);

            var n = parseInt(num);
            $(".stages img", this.el).removeAttr("active");
            $(".stages img[key="+(n+1)+"-1]", this.el).attr("active", true);
            $(".stages img[key="+(n+1)+"-2]", this.el).attr("active", true);
            $(".stages img[key="+(n+1)+"-3]", this.el).attr("active", true);
            num = parseInt(num);
            if(num < 4)
                this.loadCat(num+1)
        },
        img: function(num){
            $(".stages a", this.el).removeAttr("active");
            $(".stages a[key="+num+"]", this.el).attr("active", true);

            var name = this.i[this.currentCat][num];
            var img = this.file(name);
            if(!this.p[name]){
                this.p[name] = img;
                this.screen.append(img);
            }

            $(".screen img", this.el).removeAttr("active");
            $(img).attr("active", true);
        },
        setActive: function(){
            $(this.el).attr("active", true);
        }
    });

    return ProcessView;
});
