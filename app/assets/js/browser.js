'use strict';
/*jshint unused:false */

// load jquery et all via browserify
var $          = require('jquery');
var _          = require('underscore');
var Backbone   = require('backbone');
Backbone.$      = $;

var UserRouter = require('./routers/UserRouter');

$(function() {
    var userRouter = new UserRouter;
    $(function(){userRoutes.start()})
});
