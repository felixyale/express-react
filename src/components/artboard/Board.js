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
    this.props.handleChange();
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
      tpl: this.props.tpl,
      activeTpl: {},
      activeTplLink: '',
      modal: false,
      shouldUpdate: true
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

  componentWillUpdate(nextProps, nextState) {
    this.props.saveState();
  }

  handleTitleChange(e) {
    this.setState(update(this.state, {
      tpl: {
        title: {
          $set: e.target.value
        }
      }
    }));
  }

  handledDescriptionChange(e) {
    this.setState(update(this.state, {
      tpl: {
        description: {
          $set: e.target.value
        }
      }
    }));
  }

  moveCard(dragIndex, hoverIndex) {
    const { items } = this.state.tpl;
    const dragCard = items[dragIndex];

    this.setState(update(this.state, {
      tpl: {
        items: {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragCard]
          ]
        }
      }
    }));
  }

  handleRemove(index) {
    return () => {
      var state = update(this.state, {
        tpl: {
          items: {
            $splice: [[index, 1]]
          }
        }
      })

      this.props.tpl.items = state.tpl.items;

      this.setState(state);
    }
  }

  handleLink(item) {
    return () => {
      this.setState(update(this.state, {
        $merge: {
          activeTpl: item,
          activeTplLink: item.link,
          modal: true
        }
      }));
    }
  }

  handleLinkChange(e) {
    this.setState(update(this.state, {
      activeTplLink: {
        $set: e.target.value
      }
    }));
  }

  hideModal() {
    this.setState(update(this.state, {
      modal: {
        $set: false
      }
    }));
  }

  handleOk() {
    if (this.state.activeTpl) {
      var itemIndex = -1;
      this.state.tpl.items.forEach((item, index) => {
        if (item.id == this.state.activeTpl.id) {
          item.link = this.state.activeTplLink;
          return false;
        }
      });
      this.state.modal = false;
      this.setState(this.state);
    }
  }

  render() {
    var style = {
      display: this.state.tpl.items.length ? 'none' : 'block',
      textAlign: 'center'
    }

    var createTemplate = (item) => {
      if (item.type === 'image') {
        return (
          <img className="img-block" src={item.url} />
        )
      } else if (item.type == 'text') {
        return (
          <BoardTemplate data={item} handleChange={this.props.saveState} />
        )
      } else {
        return (
          <div />
        )
      }
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
              value={this.state.tpl.title}
              onChange={this.handleTitleChange} />
            <textarea
              className="form-control description"
              type="text"
              placeholder="微信分享描述"
              value={this.state.tpl.description}
              onChange={this.handledDescriptionChange} />
          </div>
        </div>

        <div className="h5-container">
          <div className="tpl-container" style={style}>
              <div>&#9756;请在左边添加模版</div>
          </div>
          {this.state.tpl.items.map((item, i) => {
            return (
              <Card
                key={item.id}
                index={i}
                moveCard={this.moveCard}
                handleRemove={this.handleRemove(i)}
                handleLink={this.handleLink(item)}
                config={item.config} >
                {createTemplate(item)}
              </Card>
            );
          })}
        </div>
      </div>
    )
  }
}
