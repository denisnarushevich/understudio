/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'views/menu',
    'views/home',
    'views/trailer',
    'views/chars',
    'views/process',
    'views/contacts'
], function ($, _, Backbone, JST, MenuView, HomeView, TrailerView, CharsView, ProcessView, ContactsView) {
    'use strict';

    var menuView = new MenuView(),
        homeView = new HomeView(),
        trailerView = new TrailerView(),
        charsView = new CharsView(),
        processView = new ProcessView(),
        contactsView = new ContactsView();

    var MainView = Backbone.View.extend({
        //template: JST['app/scripts/templates/main.hbs'],
        initialize: function () {
            this.el = $("#app");

            var pages = this.$pages = $("#pages");

            pages.append(homeView.render());
            pages.append(trailerView.render());
            pages.append(charsView.render());
            pages.append(processView.render());
            pages.append(contactsView.render());

            this.current = "landing";
            this.blockScroll = false;

            var self = this;
            window.onresize = function(){
                //this.blockScroll = false;
                self.show(self.current, true);
            };
        },
        render: function () {
            $(this.el).prepend(menuView.render());

            return this.el;
        },
        show: function (pageName, force) {
            if(this.blockScroll && !force)
                return;

            this.current = pageName;
            $(".page").removeAttr("active");
            switch (pageName) {
                case "landing":
                    this.scrollTo("#main");
                    menuView.setActive("home");
                    homeView.setActive();
                    break;
                case "trailer":
                    this.scrollTo("#trailer");
                    menuView.setActive("trailer");
                    trailerView.setActive();
                    break;
                case "chars":
                    this.scrollTo("#characters");
                    menuView.setActive("chars");
                    charsView.setActive();
                    break;
                case "process":
                    this.scrollTo("#gallery");
                    menuView.setActive("process");
                    processView.setActive();
                    break;
                case "contacts":
                    this.scrollTo("#contacts");
                    menuView.setActive("contacts");
                    contactsView.setActive();
                    break;
            }
        },
        scrollTo: function (id) {
            var target = $(id);

            if(this.blockScroll)
                this.$pages.stop(true, true);

            var p = target.position().top;

            this.blockScroll = true;
            var self = this;
            this.$pages.animate({
                scrollTop: this.$pages.scrollTop()+p
            }, {
                duration: 800,
                complete: function(){
                    self.blockScroll = false;
                }
            });
            return false;
        },
        showNext: function(){
            switch(this.current){
                case "landing":
                    this.show("trailer");
                    break;
                case "trailer":
                    this.show("chars");
                    break;
                case "chars":
                    this.show("process");
                    break;
                case "process":
                    this.show("contacts");
                    break;
            }
        },
        showPrev: function(){
            switch(this.current){
                case "contacts":
                    this.show("process");
                    break;
                case "trailer":
                    this.show("landing");
                    break;
                case "chars":
                    this.show("trailer");
                    break;
                case "process":
                    this.show("chars");
                    break;
            }
        }
    });

    return MainView;
});
