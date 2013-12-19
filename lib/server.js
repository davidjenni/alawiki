var express = require('express');
var stylus = require('stylus');
var index = require('./routes/index');

var app = express();
app.use(express.logger('dev'));
app.use(stylus.middleware({
  src: __dirname + '/assets',
  dest: __dirname + '/public'
}));
app.use(express.static(__dirname + '/public'));
app.set('port', process.env.PORT || 3000);
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

app.get('/', index.main);

module.exports = app;

// if (!module.parent) {
app.listen(app.get('port'));
console.log('Express started on port ' + app.get('port'));
// }
