'use strict';

var Backbone = require('backbone');
var User = requore('./User');

module.exports = Backbone.Collection.extend({
    model: User,
    url: 'http://localhost:3000/api/v1/users'
});
