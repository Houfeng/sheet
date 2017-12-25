import DataType from './data-type';

export default class Cell {

  value = '';
  editing = false;
  type = DataType.string;

  constructor(grid, row, column, opts) {
    this.__grid = grid;
    this.__row = row;
    this.__column = column;
    Object.assign(this, opts);
  }

  get grid() {
    return this.__grid;
  }

  get row() {
    return this.__row;
  }

  get column() {
    return this.__column;
  }

  select() {
    this.grid.select(this);
  }

}