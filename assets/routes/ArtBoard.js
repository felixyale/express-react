require("./ArtBoard.less");

import { Router, Route, IndexRoute, Redirect, Link, browserHistory } from 'react-router'
import React from 'react'

import ArtBoardTab from '../components/sidebar/ArtBoardTab'

export class ArtBoard extends React.Component {
  render() {
    return (
      <div className="artboard">
        <aside className="sidebar">
          <ArtBoardTab />
        </aside>
      </div>
    )
  }
}

export default ArtBoard
