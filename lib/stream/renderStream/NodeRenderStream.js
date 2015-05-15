import {
  Transform
}
from 'stream'

import option from '../defaultOption';

export default class NodeRenderStream extends Transform {
  constructor(component) {
    super(option)

    this._component = component
  }
  _transform(action, encoding, done) {
    if (action.target === 'node') {
      handleNode(this._component, action, this)
    } else {
      this.push(action)
    }

    done()
  }
}

function handleNode(component, action, stream) {
  switch (action.type) {
    case 'create':
      component.createNode(action.id, action.label)
      stream.push(action)
      break
    case 'select':
      component.select(action.id)
      stream.push(action)
      break
    default:
      stream.push(action)
  }
}
