import { Router, Route, IndexRoute, Redirect, Link, browserHistory } from 'react-router'
import React from 'react'

import SysTpl from './artboardtabs/SysTpl'

export default class ArtBoardTabs extends React.Component {
  constructor() {
    super();
    this.state = {
      activeId: 0,
      tabs: [
        {name: '系统模版', id: 0, icon: 'fa-paper-plane', children: <SysTpl />},
        {name: '草稿箱', id: 1, icon: 'fa-archive'}
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
          <i className={'fa ' + tab.icon}></i><span className="title">{tab.name}</span>
        </li>
      )
    }

    return (
      <aside className="sidebar">
        <ul className="tabs">{this.state.tabs.map(createItem)}</ul>
        <div className="tab-body">
        {this.children}
        </div>
      </aside>
    )
  }
}
