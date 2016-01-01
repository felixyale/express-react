var env = process.env.NODE_ENV || 'development';
var config = require('../config');

var cache = (function() {
  if (env == 'production' || env == 'staging') {
    var cache = require('express-redis-cache')(config('redis'));
    cache._route = function(req, res, next) {
      this.route({
        expire: {
          200: 60,
          '4xx': 60,
          403: 60,
          '5xx': 2,
          xxx: 2
        }
      })(req, res, next);
    };

    return cache;
  } else {
    return null;
  }
})();

module.exports = cache;
