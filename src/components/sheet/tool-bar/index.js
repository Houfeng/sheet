import React, { Component } from 'react';
import ResizeHandle from '../resize-handle';
import './index.less';

export default class ToolBar extends Component {

  render() {
    console.log('toolbar render');
    return <ul>
      <li>
        <a className="iconfont icon-chexiao"></a>
      </li>
      <li>
        <a className="iconfont icon-redo"></a>
      </li>
    </ul>;
  }

}