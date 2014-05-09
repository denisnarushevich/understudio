/*global define*/

define([
    'jquery',
    'backbone'
], function ($, Backbone) {
    'use strict';

    var MainRouter = Backbone.Router.extend({
        routes: {
            '': "home",
            home: "home",
            trailer: 'trailer',
            characters: 'chars',
            process: 'process',
            contacts: 'contacts'
        }
    });

    return MainRouter;
});
