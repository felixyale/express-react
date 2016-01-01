import { Router, Route, IndexRoute, Redirect, Link, browserHistory } from 'react-router'
import React from 'react'
import update from 'react/lib/update';
import $ from 'jquery'
import { ImageTpl } from '../templates/Templates'

const style = {
  maxWidth: '100%'
};

export default class TplImage extends React.Component {
  constructor() {
    super();

    this.state = {
      myphotos: []
    }
    this.items = ImageTpl;
  }

  componentDidMount() {
    if (!this.myphotosLoaded && !this.myphotosLoading) {
      this.myphotosLoading = true;
      $.ajax({
        url: '/data/myphotos'
      })
      .done((data) => {
        this.setState(update(this.state, {
          myphotos: {
            $set: data.data
          }
        }));
      })
      .always(() => {
        this.myphotosLoaded = true;
        this.myphotosLoading = false;
      });
    }
  }

  handleSelect(mixed) {
    return () => {
      
      if (typeof mixed == 'number') {
        this.props.addTpl(update(this.items[mixed], {
          $merge: {
            type: 'image'
          }
        }));
      } else {
        this.props.addTpl({
          type: 'image',
          config: {
            linkAble: true
          },
          url: 'http://fs.fangdd.com/thumb/640s480' + mixed
        });
      }
    }
  }

  uploadImage() {
    console.log('upload image');
  }

  render() {
    let createItem = (item, i) => {
      return (
        <div className="tpl-item square-box" key={i} onClick={this.handleSelect(i)}>
          <div className="square-content">
            <div className="square-table">
              <div className="square-body">
                <img className="img-block" src={item.url} />
              </div>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div>
        <div className="tpl-image">
          <div className="legend">我的图片</div>
          <div className="tpl-item square-box" onClick={this.uploadImage}>
            <div className="square-content">
              <div className="square-table">
                <div className="square-body">
                  <form action="/data/upload" encType="multipart/form-data" method="POST">
                    <input type="file" name="photos" style={{width: 100}} />
                    <button type="submit">upload</button>
                    <i className="fa fa-plus"></i>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {this.state.myphotos.map((item, i) => {
            return (
              <div className="tpl-item square-box" key={i} onClick={this.handleSelect(item)}>
                <div className="square-content">
                  <div className="square-table">
                    <div className="square-body">
                      <img className="img-block" src={'http://fs.fangdd.com/thumb/100s100' + item} />
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        <div className="tpl-image">
          <div className="legend">素材库</div>
          {this.items.map((item, i) => createItem(item, i))}
        </div>
      </div>
    )
  }
}