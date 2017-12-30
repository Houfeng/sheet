import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { model } from 'mota';
import Grid from './models/grid';
import DockPanel from 'react-dock-panel';
import ColumnsBar from './columns-bar';
import RowsBar from './rows-bar';
import ScrollPanel from './scroll-panel';
import Table from './table';
import Selection from './selection';
import Editing from './editing';
import Shortcut from './shortcut';
import * as utils from './common/utils';

import './index.less';

@model(Grid)
class Sheet extends Component {

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

  onClick = () => {
    this.model.exitEditing();
  }

  componentDidMount() {
    this.model.calcColumnsPosition();
    this.model.calcRowsPosition();
    this.shortcut = new Shortcut(this.model);
  }

  get cellAreaOffset() {
    if (!this.cellArea) return;
    if (this._cellAreaOffset) return this._cellAreaOffset;
    this._cellAreaOffset = utils
      .getPositionOffset(ReactDOM.findDOMNode(this.cellArea));
    return this._cellAreaOffset;
  }

  get editingBox() {
    if (this._editingBox) return this._editingBox;
    this._editingBox = ReactDOM.findDOMNode(this.editing);
    return this._editingBox;
  }

  pagePointToGridPoint(point) {
    const { pageX, pageY } = event;
    const offset = this.cellAreaOffset;
    const { scrollLeft, scrollTop } = this.model;
    return {
      x: point.x - offset.left + scrollLeft,
      y: point.y - offset.top + scrollTop
    };
  }

  onMouseDown = event => {
    const { pageX, pageY } = event;
    this.begin = this.pagePointToGridPoint({ x: pageX, y: pageY });
    this.model.exitEditing();
  }

  onMouseMove = event => {
    this.trigger('onMove', event);
  }

  onMouseUp = event => {
    this.trigger('onEnd', event);
    this.begin = null;
    this.end = null;
    setTimeout(() => {
      this.editingBox.focus();
    }, 100);
  }

  trigger(eventName, event) {
    if (!this.begin) return;
    const { pageX, pageY } = event;
    this.end = this.pagePointToGridPoint({ x: pageX, y: pageY });
    this.model.selectByPoint(this.begin, this.end);
    this.model.exitEditing();
  }

  render() {
    const { rows, columns, scrollTop, scrollLeft } = this.model;
    window.sheet = this;
    console.log('grid render');
    return <DockPanel className="sheet" onWheel={this.onScroll}>
      <DockPanel dock="left" className="bar-side">
        <DockPanel dock="top" className="bar bar-all"
          onClick={event => this.model.selectAll()}>
        </DockPanel>
        <DockPanel className="bar bar-rows">
          <ScrollPanel scrollTop={scrollTop} >
            <RowsBar model={this.model} />
          </ScrollPanel>
        </DockPanel>
      </DockPanel>
      <DockPanel dock="top" className="bar bar-columns">
        <ScrollPanel scrollLeft={scrollLeft} >
          <ColumnsBar model={this.model} />
        </ScrollPanel>
      </DockPanel>
      <DockPanel className="cells">
        <ScrollPanel scrollLeft={scrollLeft}
          scrollTop={scrollTop}
          ref={ref => this.cellArea = ref}
          onDoubleClick={this.onDblClick}
          onClick={this.onClick}
          onMouseDown={this.onMouseDown}
          onMouseMove={this.onMouseMove}
          onMouseUp={this.onMouseUp}>
          <Table rows={rows} columns={columns} />
          {this.model.editing ? <Editing model={this.model} owner={this}
            ref={ref => this.editing = ref} /> : null}
          <Selection model={this.model} owner={this} />
        </ScrollPanel>
      </DockPanel>
    </DockPanel>;
  }

}

export default Sheet;