export default class Row {

  height = 28;
  top = 0;

  constructor(grid) {
    this.__grid = grid;
  }

  get grid() {
    return this.__grid;
  }

  get index() {
    return this.grid.rows.indexOf(this);
  }

  toString() {
    return this.height;
  }

}