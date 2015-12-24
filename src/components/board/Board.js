import { Router, Route, IndexRoute, Redirect, Link, browserHistory } from 'react-router'
import React from 'react'
import ContentEditable from 'react-contenteditable'
import update from 'react/lib/update';
import Card from './Card';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

class BoardTemplate extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = args[0].data;
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
          html={this.state.html + this.state.id}
          disabled={false}/>
      </div>
    )
  }
}

@DragDropContext(HTML5Backend)
export default class Board extends React.Component {
  constructor() {
    super();
    this.state = {
      items: [
        {html: '系统模版', id: 0},
        {html: '系统模版', id: 1},
        {html: '系统模版', id: 2},
        {html: '系统模版', id: 3},
        {html: '系统模版', id: 4},
        {html: '系统模版', id: 5},
        {html: '系统模版', id: 6},
        {html: '系统模版', id: 7},
        {html: '系统模版', id: 8},
        {html: '系统模版', id: 9},
        {html: '系统模版', id: 10},
        {html: '系统模版', id: 11},
        {html: '系统模版', id: 12},
        {html: '系统模版', id: 13},
        {html: '系统模版', id: 14},
        {html: '系统模版', id: 15},
        {html: '系统模版', id: 16},
        {html: '系统模版', id: 17},
        {html: '系统模版', id: 18}
      ]
    }

    this.moveCard = this.moveCard.bind(this);

    this._state = Object.assign({}, this.state);

    this.handlechange = this.handlechange.bind(this);
  }

  handlechange(value) {
    console.log('handle change', this._state);
  }

  moveCard(dragIndex, hoverIndex) {
    const { items } = this.state;
    const dragCard = items[dragIndex];

    this.setState(update(this.state, {
      items: {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragCard]
        ]
      }
    }));
  }

  render() {
    const { items } = this.state;
    //
    // let createItem = (item) => {
    //   return (
    //     <div className="tpl-container" key={item.id}>
    //       <BoardTemplate data={item} handlechange={this.handlechange} />
    //     </div>
    //   )
    // }

    return (
      <div className="board">
        <div className="h5-container">
          {items.map((card, i) => {
            return (
              <Card key={card.id}
              className="tpl-container"
              index={i}
              id={card.id}
              text={card.html}
              moveCard={this.moveCard}
              tpl={<BoardTemplate data={card} handlechange={this.handlechange} />} />
            );
          })}
        </div>
      </div>
    )
  }
}
