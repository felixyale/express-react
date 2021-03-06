require("../css/button.less");
require("../css/modal.less");
require("../css/form.less");
require("../css/squareBox.less");
require("../components/artboard/ArtBoard.less");

import { Router, Route, IndexRoute, Redirect, Link, browserHistory } from 'react-router'
import React from 'react'
import ReactDom from 'react-dom'

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import ArtBoardTabs from '../components/artboard/ArtBoardTabs'
import Board from '../components/artboard/Board'
import ToolBar from '../components/artboard/ToolBar'

var hasLocalStorage = 'localStorage' in global;
var ls, testKey;

if (hasLocalStorage) {
  testKey = 'react-localstorage.test-key';
  try {
    // Access to global `localStorage` property must be guarded as it
    // fails under iOS private session mode.
    ls = global.localStorage;
    ls.setItem(testKey, 'foo');
    ls.removeItem(testKey);
  } catch (e) {
    hasLocalStorage = false;
  }
}

@DragDropContext(HTML5Backend)
export class ArtBoard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tpl: {
        items: [],
        title: '',
        description: '',
        wxLogo: ''
      }
    };

    this.addTpl = this.addTpl.bind(this);

    this.saveState = this.saveState.bind(this);
    this.loadStateFromLocalStorage();
    
    this.queueSaveState= [];
  }

  componentDidMount() {
    if (!hasLocalStorage) return;
    this.loadStateFromLocalStorage();
  }

  loadStateFromLocalStorage() {
    if (!ls) return;
    var key = this.getLocalStorageKey();
    try {
      var storedState = JSON.parse(ls.getItem(key));
      if (storedState) {
        this.state.tpl = storedState;
      }
    } catch(e) {
      if (console) console.warn("Unable to load state from localStorage.");
    }
  }

  getLocalStorageKey() {
    return 'artboard-' + (this.props.params.id || 'new');
  }

  clearQueue() {
    this.queueSaveState.forEach((time) => {
      clearTimeout(time);
    });

    this.queueSaveState.length = 0;
  }
  
  saveState() {
    if (!hasLocalStorage) return;
    var key = this.getLocalStorageKey();
    this.clearQueue();
    this.queueSaveState.push(setTimeout(() => {
      console.log('saveState success');
      this.state.tpl = this.refs.board.state.tpl;
      var value = JSON.stringify(this.state.tpl);
      ls.setItem(key, value);
    }, 1000));
  }

  addTpl(tpl) {
    this.refs.board.state.tpl.items.push(Object.assign({
      id: Date.now()
    }, tpl));

    this.refs.board.setState(this.refs.board.state);
  }

  render() {
    return (
      <div className="artboard">
        <ArtBoardTabs addTpl={this.addTpl} />
        <Board ref="board" tpl={this.state.tpl} saveState={this.saveState} />
        <ToolBar />
      </div>
    )
  }
}

export default ArtBoard;
