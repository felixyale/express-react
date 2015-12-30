import { Router, Route, IndexRoute, Redirect, Link, browserHistory } from 'react-router'
import React from 'react'

import { ImageTpl } from '../templates/Templates'

const style = {
  maxWidth: '100%'
};

export default class TplImage extends React.Component {
  constructor() {
    super();

    this.items = ImageTpl;
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
          <div className="tpl-container" dangerouslySetInnerHTML={{__html: item.html}} />
        </div>
      )
    }

    return (
      <div>
        {this.items.map(((item, i) => createItem(item, i)))}
      </div>
    )
  }
}