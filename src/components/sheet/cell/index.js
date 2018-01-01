import React, { Component } from 'react';
import { model } from 'mota';
import classNames from 'classnames';

@model
export default class CellComponent extends Component {

  render() {
    console.log('cell render');
    const { cell, row, col, colIndex, rowIndex } = this.model;
    const style = {};
    if (colIndex == 0) style.height = row.height;
    if (rowIndex == 0) style.width = col.width;
    return <td key={colIndex} style={style}>{cell.value}</td>;
  }

};