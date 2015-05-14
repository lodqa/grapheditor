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
      if (action.type === 'add') {
        this._component.createNode(action.id, action.label)
      }
      if (action.type === 'select') {
        console.log('select node', action);
      }
    }

    if (action.target === 'edge') {
      console.log('edge', action)
    }

    this.push(action)
    done()
  }
}
