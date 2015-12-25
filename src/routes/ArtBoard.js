require("../components/artboard/ArtBoard.less");

import { Router, Route, IndexRoute, Redirect, Link, browserHistory } from 'react-router'
import React from 'react'

import ArtBoardTabs from '../components/artboard/ArtBoardTabs'
import Board from '../components/artboard/Board'
import ToolBar from '../components/artboard/ToolBar'

export class ArtBoard extends React.Component {
  render() {
    return (
      <div className="artboard">
        <ArtBoardTabs />
        <Board />
        <ToolBar />
      </div>
    )
  }
}

export default ArtBoard
