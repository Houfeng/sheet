import React, { Component } from 'react';
import classNames from 'classnames';
import { model } from 'mota';
import Proxy from '../proxy';
import * as utils from 'ntils';
import './index.less';

@model
export default class Selection extends Component {

  render() {
    console.log('Selection render');
    const region = this.model.selectionRegion;
    const names = classNames({ selection: true, visible: !!region });
    return <div className={names}
      onClick={this.onClick}
      style={region}>
      <Proxy onKeyDown={this.onKeyDown} />
    </div>;
  }

  onClick = (event) => {
    event.stopPropagation();
    this.model.enterEditing();
  }

  onKeyDown = (event) => {
    const { altKey, ctrlKey, shiftKey, metaKey } = event;
    if (altKey || ctrlKey || shiftKey, metaKey) return;
    this.model.enterEditing();
  }

}