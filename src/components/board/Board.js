import { Router, Route, IndexRoute, Redirect, Link, browserHistory } from 'react-router'
import React from 'react'
import ContentEditable from 'react-contenteditable'
import _ from 'underscore'

class BoardTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.data;
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(evt) {
    this.props.handlechange();
    //this.setState({html: evt.target.value});
    this.props.data.html = evt.target.value;
  }

  render() {
    return (
      <div className="tpl-inner">
        <ContentEditable
          onChange={this.handleChange}
          html={this.state.html}
          disabled={false}/>
      </div>
    )
  }
}

export class Board extends React.Component {
  constructor() {
    super();
    this.state = {
      items: [
        {html: '系统模版', id: 0},
        {html: '系统模版', id: 1}
      ]
    }
    
    this._state = _.extend({}, this.state);

    this.handlechange = this.handlechange.bind(this);
  }

  handlechange(value) {
    console.log('handle change', this._state);
  }

  render() {
    let createItem = (item) => {
      return (
        <div className="tpl-container" key={item.id}>
          <BoardTemplate data={item} handlechange={this.handlechange} />
        </div>
      )
    }

    return (
      <div className="board">
        <div className="h5-container">
          {this.state.items.map((item => createItem(item)))}
        </div>
      </div>
    )
  }
}

export default Board
