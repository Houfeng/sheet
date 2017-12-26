import React, { Component } from 'react';
import classNames from 'classnames';
import { model } from 'mota';
import './index.less';

@model
export default class Selection extends Component {
  render() {
    console.log('Selection render');
    const region = this.model.selectRegion;
    const names = classNames({
      selection: true,
      visible: !!region
    });
    return <div className={names} style={region}></div>;
  }
}