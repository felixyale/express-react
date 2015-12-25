import { Router, Route, IndexRoute, Redirect, Link, browserHistory } from 'react-router'
import React from 'react'
import ContentEditable from 'react-contenteditable'
import update from 'react/lib/update';
import Card from './board/Card';
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
          html={this.state.html}
          disabled={true}/>
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
        {html: `
          <div style="border: 0;margin: 1em 0 2.5em;clear: both;">
            <div style="font-size: 1em;font-family: inherit;
              font-style: normal;
              font-weight: inherit;
              text-align: center;
              text-decoration: inherit;
              color: rgb(255, 255, 255);
              border-color: rgb(249, 110, 87);
              background-color: transparent;
              overflow: hidden;">
              <div style="height: 2em;">
                <div style="display: inline-block;
                  margin: 0px 15%;
                  width: 70%;
                  height: 2em;
                  background-color: rgb(249, 110, 87);">
                  <div style="height: 100%;
                    text-align: center;
                    white-space: nowrap;
                    overflow: hidden;
                    line-height: 1;
                    padding: 0.5em 0px;
                    font-size: 1em;
                    font-family: inherit;
                    font-style: normal;
                    color: rgb(255, 255, 255);
                    background-color: rgba(255, 255, 255, 0.2);
                    outline: #373b47 dotted 1px;
                    box-sizing: border-box;"
                    contenteditable="true">
                    <div>请输入标题</div>
                  </div>
                </div>
              </div>
              <div style="margin-top: -1.6em;margin-bottom: 2.1em;clear: both;">
                <div style="width: 25%;
                  height: 0px;
                  float: left;
                  border-top-width: 1em;
                  border-top-style: solid;
                  border-top-color: rgb(249, 110, 87);
                  border-bottom-width: 1em;
                  border-bottom-style: solid;
                  border-bottom-color: rgb(249, 110, 87);
                  border-left-width: 1em !important;
                  border-left-style: solid !important;
                  border-left-color: transparent !important;
                  font-size: 1em;"></div>
                <div style="width: 25%;
                  height: 0px;
                  float: right;
                  border-top-width: 1em;
                  border-top-style: solid;
                  border-top-color: rgb(249, 110, 87);
                  border-bottom-width: 1em;
                  border-bottom-style: solid;
                  border-bottom-color: rgb(249, 110, 87);
                  border-right-width: 1em !important;
                  border-right-style: solid !important;
                  border-right-color: transparent !important;
                  font-size: 1em;"></div>
              </div>
            </div>
          </div>
          `, id: 0},
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
