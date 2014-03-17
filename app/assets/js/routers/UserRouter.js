'use strict';

var Backbone = require('backbone');
var UserCollectionView = require('../views/UserCollectionView');
var UserCollection = require('../models/UserCollection');

var $          = require('jquery');

module.exports = Backbone.Router.extend({
    routes: {'users/:id': 'show',
             'users': 'index' },

    initialize: function(){
        this.userList = new UserCollection();
        console.log(this.userList);
        this.userListView = new UserCollectionView({collection: this.userList});
    },

    show: function(id){
        console.log(id);
    },

    index: function(){
        this.userList.fetch();
        $('.mainContent').replaceWith(this.userListView.el);
    },

    start: function(){
        Backbone.history.start({pushState: false});
    }
});
