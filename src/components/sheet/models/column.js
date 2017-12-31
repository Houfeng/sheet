import { isNull } from 'ntils';

export default class Column {

  width = 120;
  left = 0;

  constructor(grid) {
    this.__grid = grid;
  }

  get grid() {
    return this.__grid;
  }

  get index() {
    if (isNull(this.__index)) this.__index = this.grid.columns.indexOf(this);
    return this.__index;
  }

  set index(value) {
    this.__index = value;
  }

  get name() {
    return String.fromCharCode(this.index + 97);
  }

  toString() {
    return this.width;
  }

}