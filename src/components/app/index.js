import React, { Component } from 'react';
import DockPanel from 'react-dock-panel';
import Sheet from '../sheet';
import './index.less';

class App extends Component {
  render() {
    return <DockPanel className="app">
      <DockPanel dock="top" className="nav-bar">
        <DockPanel dock="left" className="back">
          <i className="iconfont icon-fanhui"></i>
        </DockPanel>
      </DockPanel>
      <DockPanel dock="bottom" className="tab-bar">
        tabs
      </DockPanel>
      <DockPanel>
        <Sheet />
      </DockPanel>
    </DockPanel>;
  }
}

export default App;
