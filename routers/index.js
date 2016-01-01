var fs = require('fs');
var path = require('path');
var env = process.env.NODE_ENV || 'development';

function router(app) {

  fs.readdirSync('./routers').forEach(function(filename, index) {

    var name = path.basename(filename, '.js');
    if (name == 'index') {
      return;
    }

    app.use('/' + name, require('./' + name));
  });

  // router
  // define the home page route
  app.get('/', function(req, res) {
    res.redirect('/artboard');
  });

  app.use(function(req, res, next) {
    console.error('404', req.url);
    res.status(404).render('404');
  });

  app.use(function(err, req, res, next) {
    console.error('500', err.stack);
    if (env !== 'production') {
      res.status(500).send(err.stack);
    } else {
      res.status(500).render('500');
    }
  });

}

module.exports = router;
