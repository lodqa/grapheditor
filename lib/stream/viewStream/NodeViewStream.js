import {
  Transform
}
from 'stream'

import option from '../defaultOption';

export default class NodeViewStream extends Transform {
  constructor(component) {
    super(option)

    this._component = component
  }
  _transform(action, encoding, done) {
    if (action.target === 'node') {
      if (action.type === 'add') {
        this._component.createNode(action.id, action.label)
        this.push(action)
      } else if (action.type === 'select') {
        console.log('select node', action);
        this.push(action)
      } else {
        this.push(action)
      }
    } else {
      this.push(action)
    }

    done()
  }
}
