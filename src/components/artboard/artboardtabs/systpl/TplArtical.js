import { Router, Route, IndexRoute, Redirect, Link, browserHistory } from 'react-router'
import React from 'react'
import { TextTpl } from '../../templates/Templates'
import update from 'react/lib/update';
import Card from '../../board/Card';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

export default class TplArtical extends React.Component {
  constructor() {
    super();

    this.items = TextTpl;
    // this.items = [{
    //   id: 0,
    //   name: '',
    //   __html: `
    //     <div class="tpl-artical tpl-artical-1">fasdfsadfsdafsdfasdfasdfasdfasdfasdfsfasdf</div>
    //   `
    // }, {
    //   id: 1,
    //   name: '',
    //   __html: `
    //     <div class="tpl-artical tpl-artical-2">fasdfsadfsdafsdfasdfasdfasdfasdfasdfsfasdf</div>
    //   `
    // }]
  }

  formatTemplate(item) {
    return item.replace(/contenteditable\=(\"|\')*true(\"|\')*/ig, '');
  }

  render() {
    let createItem = (item, i) => {
      return (
        <div className="tpl-container" key={i} dangerouslySetInnerHTML={{__html: this.formatTemplate(item)}} />
      )
    }

    return (
      <div className="tpl-inner">
        {this.items.map(((item, i) => createItem(item, i)))}
      </div>
    )
  }
}
