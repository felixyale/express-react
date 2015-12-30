import { Router, Route, IndexRoute, Redirect, Link, browserHistory } from 'react-router'
import React from 'react'

export default class ToolBar extends React.Component {
  constructor() {
    super();
    this.state = {}
  }

  render() {
    return (
      <div className="toolbar">
        <button type="button" className="btn btn-tool">保存</button>
        <button type="button" className="btn btn-tool">预览</button>
        <button type="button" className="btn btn-tool">发布</button>
      </div>
    )
  }
}
