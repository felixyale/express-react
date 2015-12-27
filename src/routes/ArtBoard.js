require("../components/artboard/ArtBoard.less");

import { Router, Route, IndexRoute, Redirect, Link, browserHistory } from 'react-router'
import React from 'react'

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import ArtBoardTabs from '../components/artboard/ArtBoardTabs'
import Board from '../components/artboard/Board'
import ToolBar from '../components/artboard/ToolBar'

@DragDropContext(HTML5Backend)
export class ArtBoard extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = {
      tplItems: []
    };

    // var tplItems = [1234,12341234,21341234];
    // var timeStamp = new Date().getTime();
    // tplItems.forEach((item, index) => {
    //   this.state.tplItems.push({
    //     html: item,
    //     id: timeStamp + index
    //   })
    // });

    this.addTpl = this.addTpl.bind(this);
  }

  addTpl(html) {
    this.state.tplItems.push({
      html: html,
      id: new Date().getTime()
    });
    this.setState(this.state);
  }

  render() {
    return (
      <div className="artboard">
        <ArtBoardTabs addTpl={this.addTpl} />
        <Board tplItems={this.state.tplItems} />
        <ToolBar />
      </div>
    )
  }
}

export default ArtBoard
