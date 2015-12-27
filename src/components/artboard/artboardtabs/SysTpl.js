import { Router, Route, IndexRoute, Redirect, Link, browserHistory } from 'react-router'
import React from 'react'

import TplText from './TplText'
import TplImage from './TplImage'

export default class SysTpl extends React.Component {
  constructor(...args) {
    super(...args);

    this.addTpl = this.addTpl.bind(this);
    this.templates = {
      text: <TplText addTpl={this.addTpl} />,
      image: <TplImage addTpl={this.addTpl} />
    }
    
    this.state = {
      activeId: 0,
      tabs: [
        {name: '文字段落', id: 0, type: 'text'},
        {name: '图片', id: 1, type: 'image'},
        {name: '房源', id: 2, type: 'house'}
      ]
    }

    this.handleTabClick = this.handleTabClick.bind(this);
  }

  addTpl(html) {
    this.props.addTpl(html);
  }

  handleTabClick(tab) {
    return () => {
      if (tab.id != this.state.activeId) {
        this.setState({
          activeId: tab.id
        });
      }
    }
  }

  render() {
    let createItem = (tab) => {
      let className = 'item';

      if (tab.id == this.state.activeId) {
        this.children = this.templates[tab.type];
        className = 'item active';
      }

      return (
        <li key={tab.id} className={className} onClick={this.handleTabClick(tab)} >
          <span className="title">{tab.name}</span>
        </li>
      )
    }

    return (
      <div>
        <ul className="tabs-sys">{this.state.tabs.map(createItem)}</ul>
        <div className="tab-body-sub">
        {this.children}
        </div>
      </div>
    )
  }
}
