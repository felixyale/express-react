import { Router, Route, IndexRoute, Redirect, Link, browserHistory } from 'react-router'
import React from 'react'
import Template from '../template/Template'

export default class SysTpl extends React.Component {
  constructor() {
    super();
    this.state = {
      activeId: 0,
      tabs: [
        {name: '文字段落', id: 0, children: (<Template type="artical" />)},
        {name: '图片', id: 1},
        {name: '房源', id: 2}
      ]
    }

    this.handleTabClick = this.handleTabClick.bind(this);
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
        this.children = tab.children;
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
