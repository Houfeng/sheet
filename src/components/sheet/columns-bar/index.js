import React, { Component } from 'react';
import ResizeHandle from '../resize-handle';
import './index.less';

export default class ColumnsBar extends Component {

  render() {
    const { columns } = this.model;
    console.log('ColumnsBar render');
    return <table>
      <thead>
        <tr>
          {columns.map(column => (
            <th key={column.index}
              onClick={() => this.model.selectColumn(column.index)}
              style={{ width: column.width }}>
              {column.name}
              <ResizeHandle type="width" target={column} onEnd={this.onEnd} />
            </th>
          ))}
        </tr>
      </thead>
    </table>;
  }

  onEnd = () => {
    this.model.calcColumnsPosition();
  }

}