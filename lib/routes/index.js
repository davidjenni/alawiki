'use strict';
var site = require('./site');

exports.init = function (app) {

  app.get('/', site.main);
};
