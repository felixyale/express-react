var webpack = require('webpack');
var path = require('path');
var autoprefixer = require('autoprefixer');
var env = process.env.NODE_ENV || 'development';
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var config = {
  addVendor: function(name, path) {
    this.resolve.alias[name] = path;
    this.module.noParse.push(path);
  },
  context: __dirname,
  entry: {
    app: ['./src/app.js'],
    vendor: [
      'jquery', 'react', 'react-dom', 'react-router', 'normalize.css',
      'react-dnd', 'react-dnd-html5-backend', 'font-awesome-webpack'
    ]
  },
  output: {
    publicPath: (env === 'production' || env === 'staging') ? '/esf/react/' : 'http://localhost:3001/esf/react/',
    path: path.resolve(__dirname, './dist/static.esf.fangdd.com/esf/react'),
    filename: (env === 'production' || env === 'staging') ? '[name]-[chunkhash].js' : '[name].js',
    chunkFilename: (env === 'production' || env === 'staging') ? '[name]-[chunkhash].js' : '[name].js'
  },
  module: {
    noParse: [],
    loaders: [{
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel'
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style', 'css!postcss')
    }, {
      test: /\.less$/,
      loader: ExtractTextPlugin.extract('style', 'css!postcss!less')
    },
    { test: /\.(jpg|jpeg|gif|png)$/i, loader: 'file' },
    { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=10000&minetype=application/font-woff' },
    { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader' }
  ]},
  postcss: [ autoprefixer({ browsers: ['last 2 versions'] }) ],
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor' }),
    new ExtractTextPlugin((env === 'production' || env === 'staging') ? '[name]-[chunkhash].css' : '[name].css')
  ],
  devServer: {
    host: '0.0.0.0',
    port: 3001
  }
};

// generate manifest.json
if (env == 'production' || env == 'staging') {
  config.plugins.push(function() {
    this.plugin('done', function(stats) {
      require('fs').writeFileSync(
        path.join(__dirname, 'manifest.json'),
        JSON.stringify(stats.toJson().assetsByChunkName)
      );
    });
  });
}

module.exports = config;
