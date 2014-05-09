/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var ContactsView = Backbone.View.extend({
        template: JST['app/scripts/templates/contacts.hbs'],
        initialize: function(){
            this.el = $.parseHTML(this.template());
        },
        render: function(){
            return this.el;
        },
        setActive: function(){
            $(this.el).attr("active", true);
        }
    });

    return ContactsView;
});
