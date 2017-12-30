import React, { Component } from 'react';
import { model, binding } from 'mota';
import classNames from 'classnames';

@model
@binding
export default class Cell extends Component {

  render() {
    console.log('cell render');
    const { cell, row, col } = this.model;
    return <td key={col.index}
      className={classNames({ selected: cell.selected })}
      style={{ width: col.width, height: row.height }}>
      <span className="text">{cell.value}</span>
    </td>;
  }
};