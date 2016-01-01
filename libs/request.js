var express = require('express');
var querystring = require('querystring');
var http = require('http');
var util = require('util');
var env = process.env.NODE_ENV || 'development';
var config = require('../config');
var servers = {
  java: config('java'),
  cloud: config('cloud'),
  php: config('php')
};

var request = {
  actions: {
    login: ['/agentbackground/{userName}/login', 'login.json'],
    accessToken: ['/passport/token/getAccessToken.do', 'accessToken.json', 'cloud'],
    myphotos: ['/agentbackground/{userName}/agent/list', 'myphotos.json']
  },

  getServer: function(actionKey) {
    return servers[this.actions[actionKey][2] || 'java'];
  },

  getAction: function(actionKey, data) {
    var actionConfig = this.actions[actionKey];

    var path = actionConfig[0];

    if (data) {
      for (var i in data) {
        path = path.replace('{' + i + '}', data[i]);
      }
    }

    var server = this.getServer(actionKey);
    return {
      host: server.host,
      port: server.port || 80,
      path: path,
      mock: actionConfig[1]
    };
  },

  request: function(opts, data, callback) {
    var postData;

    // An object of options to indicate where to post to
    var options = util._extend({
      // host: 'localhost',
      // port: '3000',
      // path: '/hello',
      // method: 'GET'
    }, opts);

    if (opts.method == 'POST') {
      // Build the post string from an object
      postData = data ? querystring.stringify(data) : '';
      options.headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData)
      };
    }

    if (opts.method == 'GET')  {
      // Build the post string from an object
      var query = data ? querystring.stringify(data) : '';
      if (query) {
        options.path += '?' + query;
      }

      options.headers = {};
    }

    var errorMsg = {
      error: true,
      msg: 'response parse error'
    };

    // callback once
    var done = false;
    function __callback(data){
      if (done) {
        return;
      }

      done = true;

      if (typeof callback == 'function') {
        callback(data);
      }
    }

    // Set up the request
    var req = http.request(options, function(res) {
      res.setEncoding('utf8');
      var data = '';
      res.on('data', function(chunk) {
        data += chunk;
      });

      res.on('end', function() {
        try {
          data = JSON.parse(data);
        } catch (e) {
          console.error('\x1b[4m\x1b[31mProblem with request end\x1b[39m\x1b[24m', JSON.stringify(options), e.message, data);
          data = errorMsg;
        }

        __callback(data);
      });
    });

    req.on('error', function(e) {
      console.error('\x1b[4m\x1b[31mProblem with request error\x1b[39m\x1b[24m', JSON.stringify(options), e.message);
      __callback(errorMsg);
    });

    // req.setTimeout(3000, function() {
    //   console.log('\x1b[4m\x1b[31mProblem with request timeout\x1b[39m\x1b[24m', JSON.stringify(options));
    //   req.abort();
    //   __callback(errorMsg);
    // });

    if (postData) {
      // write data to request body
      req.write(postData);
    }

    req.end();
  },

  mock: function(name, callback, noCache) {

    // delete mock cache
    if (noCache) {
      delete require.cache[require.resolve('../mock/' + name)];
    }

    callback(require('../mock/' + name));
  },

  // post with mock
  // path: Array([path, mockPath]) or String(path)
  post: function(actionKey, data, callback) {
    var opts = this.getAction(actionKey, data);
    if (env == 'development') {
      this.mock(opts.mock, callback, true);
      return;
    }

    opts.method = 'POST';
    // console.log('\x1b[4m\x1b[31mPOST\x1b[39m\x1b[24m', opts, data);
    this.request(opts, data, callback);
  },

  get: function(actionKey, data, callback) {
    var opts = this.getAction(actionKey, data);
    if (env == 'development') {
      this.mock(opts.mock, callback, true);
      return;
    }

    opts.method = 'GET';
    // console.log('GET', opts, data);
    this.request(opts, data, callback);
  }
};

module.exports = request;
