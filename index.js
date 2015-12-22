var express = require('express');
var app = express();
var env = process.env.NODE_ENV || 'development';

app.use(express.static('dist'));

app.set('views', './views');
app.set('view engine', 'jade');

if (env != 'production' && env != 'staging') {
  app.locals.pretty = true;
}

app.locals.script = (function() {
  if (env === 'development') {
    return function(file) {
      return 'http://localhost:8080/esf/react/' + file + '.js';
    }
  } else {
    var manifest = require('./manifest.json');
    return function(file) {
      return 'http://static.esf.fangdd.com/esf/react/' + manifest[file];
    }
  }
})();

app.get('*', function (req, res){
  res.render('index', { title: 'Hey', message: 'Hello there!'});
})


var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://localhost:%s', port);
});
