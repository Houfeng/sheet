import React, { Component } from 'react';
import ResizeHandle from '../resize-handle';
import './index.less';

export default class RowsBar extends Component {

  render() {
    const { rows } = this.model;
    console.log('RowsBar render');
    return <table>
      <thead>
        {rows.map(row => (
          <tr key={row.index}>
            <th style={{ height: row.height }}
              onClick={() => this.model.selectRow(row.index)}>
              {row.index + 1}
              <ResizeHandle type="height" target={row} />
            </th>
          </tr>
        ))}
      </thead>
    </table >;
  }

  onEnd = () => {
    this.model.calcRowsPosition();
  }

}