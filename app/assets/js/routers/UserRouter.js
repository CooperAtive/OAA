'use strict';

var Backbone = require('backbone');
var UserCollectionView = require('../views/UserCollectionView');
var UserCollection = require('../models/UserCollection');

var $          = require('jquery');

module.exports = Backbone.Router.extend({
    routes: {'users/:id': 'show',
             'users': 'index' },
    show: function(id){
        //stretch goal here
    },

    index: function(){
        this.userList.fetch();
        console.log(this.userList);
        console.log(this.userListView.el);
        $('.container').replaceWith(this.userListView.el);
    },

    initialize: function(){
        this.userList = new UserCollection();
        this.userListView = new UserCollectionView({collection: this.userList});
    },

    start: function(){
        Backbone.history.start({pushState: false});
    }
});
