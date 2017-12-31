import { isNull } from 'ntils';

export default class Row {

  height = 30;
  top = 0;

  constructor(grid) {
    this.__grid = grid;
  }

  get grid() {
    return this.__grid;
  }

  get index() {
    if (isNull(this.__index)) this.__index = this.grid.rows.indexOf(this);
    return this.__index;
  }

  set index(value) {
    this.__index = value;
  }

  toString() {
    return this.height;
  }

}