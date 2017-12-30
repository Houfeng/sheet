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
    return this.grid.columns.indexOf(this);
  }

  get name() {
    return String.fromCharCode(this.index + 97);
  }

  toString() {
    return this.width;
  }

}