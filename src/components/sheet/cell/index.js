import React, { Component } from 'react';
import { model, binding } from 'mota';
import classNames from 'classnames';

@model
@binding
export default class Cell extends Component {

  renderValue(cell) {
    if (cell.editing) {
      return <textarea className="input" data-bind="cell.value"
        rows={1}
        autoFocus={true}
        onDoubleClick={event => event.stopPropagation()}
        onBlur={event => {
          event.stopPropagation();
          cell.editing = false;
        }} ></textarea>;
    } else {
      return <span className="text">{cell.value}</span>;
    }
  }

  convertEndLine(str) {
    return str.split('\n').join('<br/>');
  }

  render() {
    console.log('cell render');
    const { cell, row, col } = this.model;
    return <td key={col.index}
      className={classNames({
        editing: cell.editing,
        selected: cell.selected
      })}
      style={{ width: col.width, height: row.height }}
      onDoubleClick={event => {
        event.stopPropagation();
        cell.editing = true;
      }}
      onClick={event => { cell.select() }}>
      {this.renderValue(cell)}
    </td>;
  }
};