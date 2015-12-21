var Shared = require('./../common/Shared.js');
var React = require('react');
var $ = require('jquery');

var Component = React.createClass({
  render: function () {
    console.log($);
    return (
      <h1>Hello ADMIN 3 world!</h1>
    );
  }
});

module.exports = Component;
