'use strict';
var Backbone = require('backbone');

module.exports = Backbone.Model.extend({
    idAttribute: '_id',
    urlRoot: 'http://coopert-90969.usw1-2.nitrousbox.com/api/v1/users',
    defaults: {
        first_name: '',
        last_name: '',
        email: ''
    }
});
