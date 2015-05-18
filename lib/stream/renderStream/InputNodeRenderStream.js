import {
  Transform
}
from 'stream'

import option from '../defaultOption';

export default class InputNodeRenderStream extends Transform {
  constructor(component) {
    super(option)

    this._component = component
  }
  _transform(action, encoding, done) {
    if (action.target === 'node') {
      handleNode(this._component, action, this)
    } else if (action.target === 'view') {
      handleView(this._component, action, this)
    } else if (action.target === 'message') {
      handleMessage(this._component, action, this)
    } else {
      this.push(action)
    }

    done()
  }
}

function handleNode(component, action, stream) {
  switch (action.type) {
    case 'create':
    case 'update':
      component.reset()
      stream.push(action)
      break;
    case 'select':
      component.value = action
      stream.push(action)
      break;
    default:
      stream.push(action)
  }
}

function handleView(component, action, stream) {
  switch (action.type) {
    case 'input':
      component.updateDisable()
      stream.push(action)
      break;
    default:
      stream.push(action)
  }
}

function handleMessage(component, action, stream) {
  switch (action.type) {
    case 'warn':
      component.warn(action.message)
      stream.push(action)
      break;
    default:
      stream.push(action)
  }
}
