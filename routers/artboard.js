var express = require('express');
/* eslint new-cap: [2, {"capIsNewExceptions": ["express.Router"]}] */
var router = express.Router();
var env = process.env.NODE_ENV || 'development';

// middleware specific to this router
router.use(function timeLog(req, res, next) {
  res.locals.env = env;
  next();
});

router.get('/*', function(req, res) {
  res.render('index', { title: 'Hey', message: 'Hello there!' });
});

module.exports = router;
