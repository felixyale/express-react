var express = require('express');
var app = express();
var env = process.env.NODE_ENV || 'development';
var router = require('./routers');
require('./libs/jadeHelper').init(app);

var favicon = require('serve-favicon');
app.use(favicon(__dirname + '/src/favicon.ico'));

app.use(express.static('dist'));

app.set('views', './views');
app.set('view engine', 'jade');

if (env != 'production' && env != 'staging') {
  app.locals.pretty = true;
}

router(app);

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://localhost:%s', port);
});
