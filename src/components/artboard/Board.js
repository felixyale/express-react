import { Router, Route, IndexRoute, Redirect, Link, browserHistory } from 'react-router'
import React from 'react'
import ContentEditable from 'react-contenteditable'
import update from 'react/lib/update';
import Card from './board/Card';
import Modal from '../ui/Modal';

class BoardTemplate extends React.Component {
  constructor(...args) {
    super(...args);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(evt) {
    this.props.data.html = evt.target.value;
  }

  render() {
    return (
      <ContentEditable
        onChange={this.handleChange}
        html={this.props.data.html}
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
      wxLogo: '',
      items: this.props.tplItems,
      activeTpl: {},
      activeTplLink: '',
      modal: false
    };

    this.moveCard = this.moveCard.bind(this);
    this._state = Object.assign({}, this.state);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handledDescriptionChange = this.handledDescriptionChange.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleLink = this.handleLink.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleLinkChange = this.handleLinkChange.bind(this);
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

  componentWillUpdate(nextProps, nextState) {
    console.log('update')
    this.props.saveState();
  }

  handleRemove(id) {
    return () => {
      var index = -1;
      this.state.items.forEach((item, i) => {
        if (item['id'] == id) {
          index = i;
          return false;
        }
      })
      if (index > -1) {
          this.state.items.splice(index, 1);
      }
      
      index = -1;
      this.props.tplItems.forEach((item, i) => {
        if (item['id'] == id) {
          index = i;
          return false;
        }
      });
      if (index > -1) {
          this.props.tplItems.splice(index, 1);
      }

      this.setState(this.state);
    }
  }

  handleLink(item) {
    return () => {
      this.setState({
        activeTpl: item,
        activeTplLink: item.link,
        modal: true
      });
    }
  }

  handleLinkChange(e) {
    this.setState({
      activeTplLink: e.target.value
    });
  }

  hideModal() {
    this.setState({
      modal: false
    });
  }

  handleOk() {
    if (this.state.activeTpl) {
      this.state.activeTpl.link = this.state.activeTplLink;
      this.setState(this.state);
      this.hideModal();
    }
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
        <Modal
          data={{title: '超链接'}}
          show={this.state.modal}
          onHide={this.hideModal}
          onOk={this.handleOk} >
          <input
            className="form-control"
            type="text"
            value={this.state.activeTplLink}
            onChange={this.handleLinkChange}
            placeholder="请填写链接" />
        </Modal>

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
          <div className="tpl-container" style={style}>
              <div>请在左边添加模版</div>
          </div>
          {this.state.items.map((item, i) => {
            return (
              <Card
                key={item.id}
                index={i}
                moveCard={this.moveCard}
                handleRemove={this.handleRemove(item.id)}
                handleLink={this.handleLink(item)}
                config={item.config} >
                <BoardTemplate data={item} />
              </Card>
            );
          })}
        </div>
      </div>
    )
  }
}
