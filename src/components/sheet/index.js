import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { model } from 'mota';
import Grid from './models/grid';
import DockPanel from 'react-dock-panel';
import Table from './table';
import ColumnsBar from './columns-bar';
import RowsBar from './rows-bar';
import Selection from './selection';

import './index.less';

@model(Grid)
class Sheet extends Component {

  // 暂不用局部 state，先使用 model，将来有性能问题再处理
  // state = { offsetY: 0, offsetX: 0 };

  onScroll = event => {
    event.stopPropagation();
    const { rows, columns } = this.model;
    const { deltaY, deltaX } = event;
    const absY = Math.abs(deltaY);
    const absX = Math.abs(deltaX);
    if (absY < 3 && absX < 3) return;
    let { offsetY, offsetX } = this.model;
    if (absY >= absX) {
      if (deltaY > 0) offsetY++;
      if (deltaY < 0) offsetY--;
      if (offsetY < 0) offsetY = 0;
      if (offsetY > rows.length - 1) offsetY = rows.length - 1;
      this.model.offsetY = offsetY;
    } else {
      if (deltaX > 0) offsetX++;
      if (deltaX < 0) offsetX--;
      if (offsetX < 0) offsetX = 0;
      if (offsetX > columns.length - 1) offsetX = columns.length - 1;
      this.model.offsetX = offsetX;
    }
  };

  get scrollTop() {
    const { rows, offsetY } = this.model;
    const scrollRows = rows.slice(0, offsetY);
    return scrollRows.reduce((prev, next) => prev + next, 0);
  }

  get scrollLeft() {
    const { columns, offsetX } = this.model;
    const scrollColumns = columns.slice(0, offsetX);
    return scrollColumns.reduce((prev, next) => prev + next, 0);
  }

  render() {
    const { rows, columns } = this.model;
    window.sheet = this;
    console.log('grid render');
    return <DockPanel className="sheet" onWheel={this.onScroll}>
      <DockPanel dock="left" className="bar-side">
        <DockPanel dock="top" className="bar bar-all"
          onClick={event => this.model.selectAll()}>
        </DockPanel>
        <DockPanel className="bar bar-rows">
          <div style={{ transform: `translateY(${-this.scrollTop}px)` }} >
            <RowsBar model={this.model} />
          </div>
        </DockPanel>
      </DockPanel>
      <DockPanel dock="top" className="bar bar-columns">
        <div style={{ transform: `translateX(${-this.scrollLeft}px)` }} >
          <ColumnsBar model={this.model} />
        </div>
      </DockPanel>
      <DockPanel className="cells">
        <div style={{ transform: `translate(${-this.scrollLeft}px,${-this.scrollTop}px)` }} >
          <Table rows={rows} columns={columns} />
          <Selection model={this.model} />
        </div>
      </DockPanel>
    </DockPanel>;
  }

}

export default Sheet;