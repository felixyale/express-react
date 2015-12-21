var InnerHome = require('./InnerHome.js');
var React = require('react');
var $ = require('jquery');

var Component = React.createClass({
  render: function () {
    var png = require('../bg.png');
    console.log('png', png, $);
    return (
      <div>
      <h1>Hello HOME world 5!</h1>
      <img src={png}/>
      </div>
    );
  }
});

module.exports = Component;
