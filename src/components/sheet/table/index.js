import React, { PureComponent } from 'react';
import { model } from 'mota';
import Cell from '../cell';

export default class Table extends PureComponent {

  renderDataCells(row, columns) {
    return columns.map(col => {
      const cell = this.model.getCell(row.index, col.index);
      return <Cell key={col.index} model={{ row, col, cell }} />;
    });
  }

  renderDataRows(rows, columns) {
    return rows.map(row => (
      <tr key={row.index}>
        {this.renderDataCells(row, columns)}
      </tr>
    ));
  }

  render() {
    console.log('Table render');
    const { rows, columns, ...others } = this.props;
    return <table {...others}>
      <tbody>
        {this.renderDataRows(rows, columns)}
      </tbody>
    </table>;
  }

}