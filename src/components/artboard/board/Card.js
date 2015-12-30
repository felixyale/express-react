import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import ItemTypes from './ItemTypes';
import { DragSource, DropTarget } from 'react-dnd';

const style = {
};

const cardSource = {
  beginDrag(props) {
    return {
      index: props.index
    };
  }
};

const cardTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    // Time to actually perform the action
    props.moveCard(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
  }
};

@DropTarget(ItemTypes.CARD, cardTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))
@DragSource(ItemTypes.CARD, cardSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))
export default class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      config: props.config
    }
    this.handleRemove = this.handleRemove.bind(this);
    this.handleLink = this.handleLink.bind(this);
  }
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    //index: PropTypes.number.isRequired,
    isDragging: PropTypes.bool.isRequired,
    //id: PropTypes.any.isRequired,
    //moveCard: PropTypes.func.isRequired,
    //onDrop: PropTypes.func.isRequired
  };

  handleRemove() {
    this.props.handleRemove();
  }
  
  handleLink() {
    this.props.handleLink();
  }
  
  handleClick(e) {
    if (e.target.tagName == 'A') {
      e.preventDefault();
    }
  }

  render() {
    const { text, isDragging, connectDragSource, connectDropTarget } = this.props;
    const opacity = isDragging ? 0 : 1;

    var toolsLinkStyle = {
      display: this.state.config.linkAble ? 'block' : 'none'
    };

    return connectDragSource(connectDropTarget(
      <div className="tpl-container" onClick={this.handleClick}>
        <div className="tools-left"><i className="fa fa-trash-o" onClick={this.handleRemove}></i></div>
        <div className="tools-right"><i className="fa fa-link" style={toolsLinkStyle} onClick={this.handleLink}></i></div>
        <div className="drag-source">
          <div style={{ ...style, opacity }}>
          {this.props.children}
          </div>
        </div>
      </div>
    ));
  }
}
