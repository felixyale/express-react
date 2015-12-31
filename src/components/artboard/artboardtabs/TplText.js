import { Router, Route, IndexRoute, Redirect, Link, browserHistory } from 'react-router'
import React from 'react'

import { TextTpl } from '../templates/Templates'

export default class TplText extends React.Component {
  constructor() {
    super();

    this.items = TextTpl;
  }

  formatTemplate(item) {
    return item.replace(/contenteditable\=(\"|\')*true(\"|\')*/ig, '');
  }
  
  handleSelect(index) {
    return () => {
      this.props.addTpl(this.items[index]);
    }
  }

  render() {
    let createItem = (item, i) => {
      return (
        <div className="tpl-item" key={i} onClick={this.handleSelect(i)}>
          <div className="tpl-container" dangerouslySetInnerHTML={{__html: this.formatTemplate(item.html)}} />
        </div>
      )
    }

    return (
      <div className="tpl-text">
        {this.items.map(((item, i) => createItem(item, i)))}
      </div>
    )
  }
}