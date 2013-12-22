var config;
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  config = require('./config-debug');
}
else {
  config = require('./config-prod');
}

var server = require('./server');

var app = server.createApp(config);
server.start(app, config);

module.exports = app;

