import React, { Component } from 'react';
import classNames from 'classnames';
import { model } from 'mota';
import './index.less';

@model
export default class Selection extends Component {
  render() {
    console.log('Selection render');
    const { rows = [], columns = [], selection } = this.model;
    const { begin, end } = selection;
    let left = 0, top = 0, width = 0, height = 0, visible = false;
    if (begin && end) {
      left = columns.slice(0, begin.column)
        .reduce((prev, next) => prev + next, 0);
      top = rows.slice(0, begin.row)
        .reduce((prev, next) => prev + next, 0);
      width = columns.slice(begin.column, end.column + 1)
        .reduce((prev, next) => prev + next, 0);
      height = rows.slice(begin.row, end.row + 1)
        .reduce((prev, next) => prev + next, 0);
      visible = true;
    }
    const names = classNames({
      selection: true,
      visible: visible
    });
    return <div className={names} style={{ left, top, width, height }}></div>;
  }
}