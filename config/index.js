var config = function(name) {
  return require('./' + (process.env.NODE_ENV || 'development') + '/' + name);
};

module.exports = config;
