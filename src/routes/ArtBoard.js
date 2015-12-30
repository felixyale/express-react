require("../css/button.less");
require("../css/modal.less");
require("../css/form.less");
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
      tplItems: []
    };

    this.addTpl = this.addTpl.bind(this);

    this.getTemplate = this.getTemplate.bind(this);
    this.saveState = this.saveState.bind(this);
    this.loadStateFromLocalStorage();
  }

  componentDidMount() {
    if (!hasLocalStorage) return;
    this.loadStateFromLocalStorage();
  }

  componentWillUpdate(nextProps, nextState) {
    this.saveState();
    console.log('update', nextState);
  }

  loadStateFromLocalStorage() {
    if (!ls) return;
    var key = this.getLocalStorageKey();
    try {
      var storedState = JSON.parse(ls.getItem(key));
      if (storedState) {
        this.state = storedState;
      }
    } catch(e) {
      if (console) console.warn("Unable to load state from localStorage.");
    }
  }

  getLocalStorageKey() {
    return 'artboard-' + (this.props.params.id || 'new');
  }

  saveState() {
    if (!hasLocalStorage) return;
    var key = this.getLocalStorageKey();
    console.log('saveState');
    setTimeout(() => {
      this.state.tplItems = this.refs.board.state.items;
      ls.setItem(key, JSON.stringify({
        tplItems: this.refs.board.state.items
      }));
    })
  }

  getTemplate() {
    setInterval(() => {
      let names = [];
      this.refs.board.state.items.forEach((item, index) => {
        names.push(item.name + (item.link || '') + item.html);
      });
      console.log(names.join(','));
    }, 5000);
  }

  addTpl(tpl) {
    this.refs.board.state.items.push(Object.assign({
      id: Date.now()
    }, tpl));

    this.refs.board.setState(this.refs.board.state);
  }

  render() {
    return (
      <div className="artboard">
        <ArtBoardTabs addTpl={this.addTpl} />
        <Board ref="board" tplItems={this.state.tplItems} saveState={this.saveState} />
        <ToolBar />
      </div>
    )
  }
}

export default ArtBoard;
