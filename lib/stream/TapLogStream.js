import {
  Transform
}
from 'stream'

import option from './defaultOption';
export default class extends Transform {
  constructor(name) {
    super(option)

    this._name = name
  }
  _transform(action, encoding, done) {
    console.debug(this._name, action)

    if (!this.push(action))
      throw new Error('The stream is clogged.')

    done()
  }
}
