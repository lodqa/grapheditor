import {
  Transform
}
from 'stream'

import option from '../defaultOption';

export default class InputNodeViewStream extends Transform {
  constructor(component) {
    super(option)

    this._component = component
  }
  _transform(action, encoding, done) {
    if (action.target === 'node') {
      this._component.reset()
    }

    if (action.target === 'view') {
      if (action.action === 'input')
        this._component.updateDisable()

      if (action.action === 'duplicate')
        this._component.duplicateUrl(action.url)
    }

    this.push(action)
    done()
  }
}
