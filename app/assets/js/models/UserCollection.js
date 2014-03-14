'use strict';

var Backbone = require('backbone');
var User = require('./User');

module.exports = Backbone.Collection.extend({
    model: User,
    url: 'http://coopert-90969.usw1-2.nitrousbox.com/api/v1/users'
});
