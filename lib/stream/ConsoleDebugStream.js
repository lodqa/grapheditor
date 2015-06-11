import {
  Writable
}
from 'stream'

import option from './defaultOption';
export default class extends Writable {
  constructor(name) {
    super(option)

    this._name = name
  }
  _write(action, encoding, done) {
    console.debug(this._name, action);
    done()
  }
}
