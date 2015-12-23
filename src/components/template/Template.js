require('./template.less')

import { Router, Route, IndexRoute, Redirect, Link, browserHistory } from 'react-router'
import React from 'react'
import TplArtical from './TplArtical'

export default class Template extends React.Component {
  constructor() {
    super();
    this.templates = {
      artical: <TplArtical />
    }
  }

  render() {
    var tpl = this.templates[this.props.type];
    return (
      <div>
        {tpl}
      </div>
    )
  }
}
