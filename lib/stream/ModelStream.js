import {
  Transform
}
from 'stream'

import option from './defaultOption';

export default class ModelStream extends Transform {
  constructor() {
    super(option)
    this._nodes = new Map()
  }
  _transform(action, encoding, done) {
    if (action.type === 'node') {
      if (!this._validateNode(action)) {
        done();
        return;
      }

      this._nodes.set(action.url, action.label)
    }

    this.push(action)
    done()
  }
  _validateNode(action) {
    return action.url && !this._nodes.has(action.url)
  }
}
