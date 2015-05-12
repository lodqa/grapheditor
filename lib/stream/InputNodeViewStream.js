import {
  Transform
}
from 'stream'

import option from './defaultOption';

export default class InputNodeViewStream extends Transform {
  constructor(component) {
    super(option)

    this._component = component
  }
  _transform(action, encoding, done) {
    if (action.type === 'node') {
      this._component.reset()
    }

    if (action.type === 'view') {
      this._component.updateDisable()
    }

    this.push(action)
    done()
  }
}
