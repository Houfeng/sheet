import React, { Component } from 'react';
import classNames from 'classnames';
import { model, watch } from 'mota';
import './index.less';

@model
export default class Editing extends Component {

  render() {
    console.log('Editing render');
    const { editingRegion, editing, editingCell } = this.model;
    const names = classNames({ editing: true, visible: editing });
    return <textarea className={names}
      onClick={event => event.stopPropagation()}
      onDoubleClick={event => event.stopPropagation()}
      onMouseDown={event => event.stopPropagation()}
      onMouseUp={event => event.stopPropagation()}
      onMouseMove={event => event.stopPropagation()}
      onKeyDown={event => event.stopPropagation()}
      onKeyUp={event => event.stopPropagation()}
      autoFocus={true}
      tabIndex={0}
      value={editingCell.value}
      onChange={event => editingCell.value = event.target.value}
      style={editingRegion}>
    </textarea>;
  }

}