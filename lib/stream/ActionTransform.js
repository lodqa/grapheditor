import {
  Transform
}
from 'stream'

import option from './defaultOption';

export default class extends Transform {
  constructor() {
    super(option)
  }
  _transform(chunk, encoding, callback) {
    let results = []
    this._transformAction(chunk, results.push.bind(results))

    if (results.length === 0) {
      this.push(chunk)
    } else {
      results.forEach(r => this.push(r))
    }

    callback()
  }
  _transformAction(action, push) {
    throw new Error('not implemented');
  }
}
