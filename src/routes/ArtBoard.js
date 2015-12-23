require("./ArtBoard.less");

import { Router, Route, IndexRoute, Redirect, Link, browserHistory } from 'react-router'
import React from 'react'

import ArtBoardTab from '../components/sidebar/ArtBoardTab'
import Board from '../components/board/Board'

export class ArtBoard extends React.Component {
  render() {
    return (
      <div className="artboard">
        <ArtBoardTab />
        <Board />
      </div>
    )
  }
}

export default ArtBoard
