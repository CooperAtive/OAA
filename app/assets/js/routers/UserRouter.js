'use strict';

var Backbone = require('Backbone');

module.exports = Backbone.Router.extend({
    routes: {'users/:id': 'show',
             'users': 'index' },
    show: function(id){
        //stretch goal here
    },

    index: function(){
        this.userList.fetch();
        $('.container').replaceWith(this.userListView.el);
    },

    initialize: function(){
        this.userList = new UserCollection();
        this.userListView = new UserCollectionView({collection: this.userList});

    }
})
