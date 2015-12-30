var env = process.env.NODE_ENV || 'development';

var helpers = {
  script: function(file) {
    if (env === 'development') {
      return 'http://localhost:8080/esf/react/' + file + '.js';
    } else {
      var manifest = require('./manifest.json');
      return 'http://static.esf.fangdd.com/esf/react/' + manifest[file][0];
    }
  },

  css: function(file) {
    if (env === 'development') {
      return 'http://localhost:8080/esf/react/' + file + '.css';
    } else {
      var manifest = require('./manifest.json');
      return 'http://static.esf.fangdd.com/esf/react/' + manifest[file][1];
    }
  }
}

module.exports = {
  init: function(app) {
    Object.keys(helpers).forEach(function (key) {
      app.locals[key] = helpers[key];
    });
  }
};
