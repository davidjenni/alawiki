var winston = require('winston');
var fs = require('fs');
var path = require('path');

module.exports.init = function(config) {
  if (!config.appDirectory) {
    throw new Error('appDirectory is not set in config.js');
  }
  if (config.logger) {
    var logFile = config.logger.logFile || 'logs/logs.log';
    var stream = createLogStream(path.join(config.appDirectory, logFile));
    var options = { 'stream': stream };
    winston.add(winston.transports.File, options);

    // TODO: make conditional on dev vs prod: for dev -> don't handle but have it show as console spew
    // options.handleExceptions = true;
    var exceptionsFile = config.logger.exceptionsFile || 'logs/exceptions.log';
    winston.handleExceptions(new winston.transports.File({ filename: exceptionsFile }));
  }
};

module.exports.finish = function() {
  winston.remove(winston.transports.File);
}

function createLogStream(logFile) {
  var dir = path.dirname(logFile);
  if (dir && !fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  return fs.createWriteStream(logFile, { flags: 'a' });
}

function log(level, message, meta) {
  if (meta) {
    winston.log(level, message, meta);
  }
  else {
    winston.log(level, message);
  }
}

module.exports.log = log;


module.exports.expressLog = function (express, config) {
  var stream;
  if (config.logger) {
    var expressFile = path.join(config.appDirectory, config.logger.expressFile);
    if (expressFile) {
      stream = createLogStream(expressFile);
    }
    stream = stream || process.stdout;
  }
  return express.logger({
    'stream': stream
  });
};

