import React, { Component } from 'react';
import ResizeHandle from '../resize-handle';
import './index.less';

export default class FormulaBar extends Component {

  render() {
    console.log('FormulaBar render');
    return <div>
      <div className="cell-name">
        <i className="iconfont icon-formula"></i>
      </div>
      <input className="cell-expr" />
    </div>;
  }

}