import { Router, Route, IndexRoute, Redirect, Link, browserHistory } from 'react-router'
import React from 'react'

export default class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.data;

    this.handleClose = this.handleClose.bind(this);
    this.handleOk = this.handleOk.bind(this);
  }
  
  handleClose(e) {
    if (e.target != e.currentTarget) {
      return;
    }

    this.props.onHide();
  }

  handleOk(e) {
    e.preventDefault();
    if (e.target != e.currentTarget) {
      return;
    }

    this.props.onOk();
  }

  render() {
    var style = {
      display: this.props.show ? 'block' : 'none'
    }

    return (
      <div className="modal" style={style} onClick={this.handleClose}>
        <div className="modal-dialog">
          <div className="modal-box">
            <div className="modal-content">
              <form onSubmit={this.handleOk}>
                <div className="modal-header">
                  <button type="button" className="close" onClick={this.handleClose}>×</button>
                  <div className="modal-title">{this.state.title}</div>
                </div>
                <div className="modal-body">
                  {this.props.children}
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={this.handleClose}>取消</button>
                  <button type="submit" className="btn btn-primary">确定</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
