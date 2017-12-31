import React, { Component } from 'react';
import { model, binding } from 'mota';
import classNames from 'classnames';

@model
@binding
export default class Cell extends Component {

  render() {
    console.log('cell render');
    const { cell, row, col, colIndex, rowIndex } = this.model;
    const style = {};
    if (colIndex == 0) style.height = row.height;
    if (rowIndex == 0) style.width = col.width;
    return <td key={colIndex}
      className={classNames({ selected: cell.selected })}
      style={style}>
      <span className="text">{cell.value}</span>
    </td>;
  }

};