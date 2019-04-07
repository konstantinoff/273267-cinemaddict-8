
class Store {
  constructor() {
    this._data = null;
  }

  get data() {
    return this._data;
  }
  set data(data) {
    this._data = data;
  }
}

export default new Store();
