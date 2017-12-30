import key from 'shortcut-key';

export default class Shortcut {

  constructor(model) {
    this.model = model;
    this.key = key;
    key.filter = event => (true);
    this._bindBuildIns();
  }

  on(keys, handler) {
    return key(keys, (...args) => handler(this.model, ...args));
  }

  off(...args) {
    return key.unbind(...args);
  }

  _bindBuildIns() {
    this.on('enter', () => {
      this.model.exitEditing();
    });
  }

}