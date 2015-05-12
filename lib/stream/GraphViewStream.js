import {
  Transform
}
from 'stream'

import option from './defaultOption';

export default class GraphViewStream extends Transform {
  constructor(component) {
    super(option)

    this._component = component
  }
  _transform(action, encoding, done) {
    if (action.type === 'node') {
      this._component.createNode(action.url, action.label)
    }

    this.push(action)
    done()
  }
}
