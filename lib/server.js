var express = require('express');
var stylus = require('stylus');
var routes = require('./routes/');
var logger = require('./utils/logger');

module.exports.createApp = function (config) {
  'use strict';
  var app = module.exports = express();
  logger.init(config);
  app.use(logger.expressLog(express, config));

  app.use(stylus.middleware({
    src: __dirname + '/assets',
    dest: __dirname + '/public'
  }));
  app.use(express.static(__dirname + '/public'));
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');

  // development only
  if ('development' === app.get('env')) {
    app.set('view options', { self: true});
    app.locals.pretty = true;
    app.use(express.errorHandler({
      dumpExceptions: true,
      showStack: true
    }));
  } else {
    app.use(express.errorHandler());
  }

  app.use(express.favicon());
  app.use(express.urlencoded());
  app.use(express.json());
  app.use(express.methodOverride());
  app.use(app.router);
  return app;
};

module.exports.start = function (app, config) {
  'use strict';
  routes.init(app);
  // if (!module.parent) {
  app.set('port', config.port || 3000);
  app.listen(app.get('port'));
  logger.log('info', 'Express started on port ' + app.get('port') + ' in mode: ' + app.get('env'));
  // }
};

