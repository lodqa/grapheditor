import {
  Transform
}
from 'stream'

import option from './defaultOption';
export default class DebugLogStream extends Transform {
  constructor(name) {
    super(option)

    this._name = name
  }
  _transform(action, encoding, done) {
    console.debug(this._name, action);
    this.push(action)
    done()
  }
}
