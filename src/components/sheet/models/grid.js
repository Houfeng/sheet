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

  editing = false;

  offsetY = 0;
  offsetX = 0;

  get scrollTop() {
    const { rows, offsetY } = this;
    const scrollRows = rows.slice(0, offsetY);
    return scrollRows.reduce((prev, next) => prev + next, 0);
  }

  get scrollLeft() {
    const { columns, offsetX } = this;
    const scrollColumns = columns.slice(0, offsetX);
    return scrollColumns.reduce((prev, next) => prev + next, 0);
  }

  selection = {
    begin: { column: -1, row: -1 },
    end: { column: -1, row: -1 }
  };

  get normalizeSelection() {
    const { begin, end } = this.selection;
    const normalizeBegin = {}, normalizeEnd = {};
    if (begin.column < end.column) {
      normalizeBegin.column = begin.column;
      normalizeEnd.column = end.column;
    } else {
      normalizeBegin.column = end.column;
      normalizeEnd.column = begin.column;
    }
    if (begin.row < end.row) {
      normalizeBegin.row = begin.row;
      normalizeEnd.row = end.row;
    } else {
      normalizeBegin.row = end.row;
      normalizeEnd.row = begin.row;
    }
    return { begin: normalizeBegin, end: normalizeEnd };
  }

  calcColumnsPosition() {
    const { columns = [] } = this;
    let start = 0;
    columns.forEach(column => {
      column.left = start;
      start += column.width;
    });
  }

  calcRowsPosition() {
    const { rows = [] } = this;
    let start = 0;
    rows.forEach(row => {
      row.top = start;
      start += row.height;
    });
  }

  get editingRegion() {
    const { rows = [], columns = [], normalizeSelection } = this;
    const { begin } = normalizeSelection;
    if (!begin || begin.column < 0 || begin.row < 0) return;
    const editingColumn = columns[begin.column];
    const editingRow = rows[begin.row];
    const left = editingColumn.left;
    const width = editingColumn.width + 1;
    const top = editingRow.top;
    const height = editingRow.height + 1;
    return { left, top, width, height };
  }

  get editingCell() {
    const { begin } = this.normalizeSelection;
    if (!begin || begin.column < 0 || begin.row < 0) return {};
    return this.getCell(begin.column, begin.row);
  }

  enterEditing() {
    this.editing = true;
  }

  exitEditing() {
    this.editing = false;
  }

  get selectRegion() {
    const { rows = [], columns = [], normalizeSelection } = this;
    const { begin, end } = normalizeSelection;
    if (!begin || !end) return;
    const beginColumn = columns[begin.column];
    const beginRow = rows[begin.row];
    const endColumn = columns[end.column];
    const endRow = rows[end.row];
    if (!beginColumn || !beginRow || !endColumn || !endRow) return;
    return {
      left: beginColumn.left,
      width: endColumn.left + endColumn.width - beginColumn.left,
      top: beginRow.top,
      height: endRow.top + endRow.height - beginRow.top
    };
  }

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
      { column: this.columns.length - 1, row: rowIndex });
  }

  selectAll() {
    this.select({ row: 0, column: 0 },
      { column: this.columns.length - 1, row: this.rows.length - 1 });
  }

  selectByPoint(beginPoint, endPoint) {
    const begin = this.getPositionByPoint(beginPoint.x, beginPoint.y);
    const end = this.getPositionByPoint(endPoint.x, endPoint.y);
    this.select(begin, end);
  }

  getPositionByPoint(x = 0, y = 0) {
    const column = this.columns.find(col => (x -= col.width) <= 0);
    const row = this.rows.find(row => (y -= row.height) <= 0);
    return { column: column.index, row: row.index };
  }

  getCellByPoint(x = 0, y = 0) {
    const position = this.getPositionByPoint(x, y);
    return this.getCell(position.row, position.column);
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

  getRowAndColumn(colIndex, rowIndex) {
    const row = this.getRow(rowIndex);
    const column = this.getColumn(colIndex);
    return { column, row };
  }

  /**
   * 创建一个行单元格
   */
  createCell(colIndex, rowIndex) {
    const { row, column } = this.getRowAndColumn(colIndex, rowIndex);
    return new Cell(this, column, row);
  }

  getCell(colIndex, rowIndex) {
    const { row, column } = this.getRowAndColumn(colIndex, rowIndex);
    if (!row || !column) return;
    if (!this.data[row.index]) this.data.set(row.index, []);
    const dataRow = this.data[row.index];
    if (!dataRow[column.index]) dataRow.set(
      column.index, this.createCell(column, row)
    );
    return dataRow[column.index];
  }

  toggleCellEditing(colIndex, rowIndex) {
    const cell = this.getCell(colIndex, rowIndex);
    if (!cell) return;
    cell.editing = !cell.editing;
  }

  get current() {

  }

  constructor() {
    this.createInitail();
  }

}