import * as utils from 'ntils';
import Row from './row';
import Column from './column';
import Cell from './cell';

export default class Grid {

  /**
   * 表格名称
   */
  name = '';

  /**
   * 表格的列定义
   */
  columns = [];

  /**
   * 表格行定义
   */
  rows = [];

  offsetY = 0;
  offsetX = 0;

  selection = {
    begin: { column: -1, row: -1 },
    end: { column: -1, row: -1 }
  };

  select(begin, end = begin) {
    if (begin instanceof Cell) {
      begin = { row: begin.row.index, column: begin.column.index };
    }
    if (end instanceof Cell) {
      end = { row: end.row.index, column: end.column.index };
    }
    this.selection.begin = begin;
    this.selection.end = end;
  }

  selectColumn(colIndex) {
    if (!utils.isNumber(colIndex)) colIndex = this.getColumn(colIndex).index;
    this.select({ column: colIndex, row: 0 },
      { column: colIndex, row: this.rows.length - 1 });
  }

  selectRow(rowIndex) {
    if (!utils.isNumber(rowIndex)) rowIndex = this.getRow(rowIndex).index;
    this.select({ row: rowIndex, column: 0 },
      { row: rowIndex, column: this.columns.length - 1 });
  }

  selectAll() {
    this.select({ row: 0, column: 0 },
      { row: this.rows.length - 1, column: this.columns.length - 1 });
  }

  /**
   * 表格数据
   */
  data = [];

  /**
   * 创建一个新列
   */
  createColumn() {
    return new Column(this);
  }

  /**
   * 在指定的位置插入一列
   * @param {number} index 列索引
   * @param {Column} 要插入的 col，如果省插入一个新空白 col
   */
  insertColumn(index, column) {
    column = column || this.createColumn();
    this.columns.splice(index, 0, column);
  }

  /**
   * 创建一个新行
   */
  createRow() {
    return new Row(this);
  }

  /**
   * 在指定的位置插入一行     
   * @param {number} index 行索引
   * @param {Array<Cell>} 要插入的 row，如果省插入一个新空白 row
   */
  insertRow(index, row) {
    row = row || this.createRow();
    this.rows.splice(index, 0, row);
  }

  /**
   * 创建表格默认的行
   */
  createInitail() {
    utils.fromTo(0, 12, code => {
      const column = this.createColumn();
      this.columns.push(column);
    });
    utils.fromTo(0, 24, code => {
      const row = this.createRow();
      this.rows.push(row);
    });
  }

  getRow(rowIndex) {
    return utils.isNumber(rowIndex) ? this.rows[rowIndex] : rowIndex;
  }

  getColumn(colIndex) {
    return utils.isNumber(colIndex) ? this.columns[colIndex] : colIndex;
  }

  getRowAndColumn(rowIndex, colIndex) {
    const row = this.getRow(rowIndex);
    const column = this.getColumn(colIndex);
    return { row, column };
  }

  /**
   * 创建一个行单元格
   */
  createCell(rowIndex, colIndex) {
    const { row, column } = this.getRowAndColumn(rowIndex, colIndex);
    return new Cell(this, row, column);
  }

  getCell(rowIndex, colIndex) {
    const { row, column } = this.getRowAndColumn(rowIndex, colIndex);
    if (!this.data[row.index]) this.data.set(row.index, []);
    const dataRow = this.data[row.index];
    if (!dataRow[column.index]) dataRow.set(
      column.index, this.createCell(row, column)
    );
    return dataRow[column.index];
  }

  toggleCellEditing(rowIndex, colIndex) {
    const cell = this.getCell(rowIndex, colIndex);
    if (!cell) return;
    cell.editing = !cell.editing;
  }

  get current() {

  }

  constructor() {
    this.createInitail();
  }

}