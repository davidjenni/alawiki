var express = require('express');
// var http = require('http');
var index = require('./routes/index');

var app = express();
app.use(express.static(__dirname + '/public'));
app.use(express.logger('dev'));
app.use(app.router);
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(express.favicon());
app.use(express.urlencoded());
app.use(express.json());
app.use(express.methodOverride());

// development only
if ('development' === app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', index.home);

module.exports = app;

// if (!module.parent) {
app.listen(app.get('port'));
console.log('Express started on port ' + app.get('port'));
// }
