var webpack = require('webpack');
var path = require('path');
var bower_dir = path.join(__dirname, 'bower_components');
var node_modules_dir = path.join(__dirname, 'node_modules');

var config = {
  addVendor: function (name, path) {
    this.resolve.alias[name] = path;
    this.module.noParse.push(path);
  },
  context: __dirname,
  entry: {
    app: process.env.NODE_ENV === 'production' ? ['./assets/main.js'] : ['webpack/hot/dev-server', './assets/main.js'],
    vendor: ["jquery", "react"]
  },
  output: {
    publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
    path: path.resolve(__dirname, process.env.NODE_ENV === 'production' ? './dist/' : './build'),
    filename: process.env.NODE_ENV === 'production' ? "[name]-[chunkhash].js" : "[name].js",
    chunkFilename: process.env.NODE_ENV === 'production' ? "[name]-[chunkhash].js" : null
  },
  resolve: {
    alias: {}
  },
  module: {
    noParse: [],
    loaders: [{
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel?presets[]=react,presets[]=es2015'
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }, {
      test: /\.(woff|png)$/,
      loader: 'file-loader'
    }
  ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({"name": "vendor", "filename": null}),
    function() {
      this.plugin("done", function(stats) {
        require("fs").writeFileSync(
          path.join(__dirname, "dist", "stats.json"),
          JSON.stringify(stats.toJson())
        );
      });
    }
  ]
};

config.addVendor('react', path.resolve(bower_dir, 'react/react.min.js'));
config.addVendor('jquery', path.resolve(bower_dir, 'jquery/jquery-2.1.4/dist/jquery.min.js'));

module.exports = config;
