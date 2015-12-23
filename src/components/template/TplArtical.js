import { Router, Route, IndexRoute, Redirect, Link, browserHistory } from 'react-router'
import React from 'react'

export default class TplArtical extends React.Component {
  constructor() {
    super();

    this.items = [{
      id: 0,
      name: '',
      __html: `
        <div class="tpl-artical tpl-artical-1">fasdfsadfsdafsdfasdfasdfasdfasdfasdfsfasdf</div>
      `
    }, {
      id: 1,
      name: '',
      __html: `
        <div class="tpl-artical tpl-artical-2">fasdfsadfsdafsdfasdfasdfasdfasdfasdfsfasdf</div>
      `
    }]
  }

  render() {
    let createItem = (item) => {
      return (
        <div className="tpl-container" key={item.id} dangerouslySetInnerHTML={item} />
      )
    }

    return (
      <div className="tpl-inner">
        {this.items.map((item => createItem(item)))}
      </div>
    )
  }
}
