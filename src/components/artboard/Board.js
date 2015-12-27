import { Router, Route, IndexRoute, Redirect, Link, browserHistory } from 'react-router'
import React from 'react'
import ContentEditable from 'react-contenteditable'
import update from 'react/lib/update';
import Card from './board/Card';

class BoardTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.data;

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(evt) {
    this.props.handlechange();
    //this.setState({html: evt.target.value});
    this.props.data.html = evt.target.value;
  }

  render() {
    return (
      <ContentEditable
        onChange={this.handleChange}
        html={this.state.html}
        disabled={true}/>
    )
  }
}

export default class Board extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      description: '',
      items: this.props.tplItems
    }

    this.moveCard = this.moveCard.bind(this);

    this._state = Object.assign({}, this.state);

    this.handleTplChange = this.handleTplChange.bind(this);
    
    this.handleTitleChange = this.handleTitleChange.bind(this);
    
    this.handledDescriptionChange = this.handledDescriptionChange.bind(this);
  }

  handleTplChange(value) {
    console.log('handle change', this._state);
  }

  handleTitleChange(e) {
    this.setState({title: e.target.value});
  }

  handledDescriptionChange(e) {
    this.setState({description: e.target.value});
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
    // add new template form menu
    if (this.props.tplItems.length > this.state.items.length) {
      this.props.tplItems.forEach((item, index) => {
        if (index >= this.state.items.length) {
          this.state.items.push(item);
        }
      })
    }
    
    var style = {
      display: this.state.items.length ? 'none' : 'block',
      textAlign: 'center'
    }

    return (
      <div className="board">
        <div className="title-container">
          <figure className="figure">
            <img data-src="..." className="figure-img img-fluid img-rounded" alt=""/>
          </figure>
          <div className="title-form">
            <input
              className="form-control title"
              type="text"
              placeholder="标题"
              value={this.state.title}
              onChange={this.handleTitleChange} />
            <textarea
              className="form-control description"
              type="text"
              placeholder="微信分享描述"
              value={this.state.description}
              onChange={this.handledDescriptionChange} />
          </div>
        </div>
        <div className="h5-container">
          <div style={style}>请在左边添加模版</div>
          {this.state.items.map((item, i) => {
            return (
              <Card
                key={item.id}
                index={i}
                moveCard={this.moveCard}
                tpl={<BoardTemplate data={item} handlechange={this.handleTplChange} />} />
            );
          })}
        </div>
      </div>
    )
  }
}
