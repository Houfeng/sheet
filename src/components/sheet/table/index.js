import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import { model } from 'mota';
import CellComponent from '../cell';
import './index.less';

export default class Table extends PureComponent {

  renderDataCells(row, columns, rowIndex) {
    return columns.map((col, colIndex) => {
      const cell = this.model.getCell(colIndex, rowIndex);
      return <CellComponent key={colIndex}
        model={{ row, col, cell, colIndex, rowIndex }} />;
    });
  }

  renderDataRows(rows, columns) {
    return rows.map((row, rowIndex) => (
      <tr key={rowIndex}>
        {this.renderDataCells(row, columns, rowIndex)}
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