import {
  Transform
}
from 'stream'

import option from '../defaultOption';

export default class GraphViewStream extends Transform {
  constructor(component) {
    super(option)

    this._component = component
  }
  _transform(action, encoding, done) {
    if (action.target === 'node') {
      this._component.createNode(action.id, action.label)
    }

    if (action.target === 'edge') {
      console.log(action)
    }

    this.push(action)
    done()
  }
}
