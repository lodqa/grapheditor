import {
  Transform
}
from 'stream'

import option from '../defaultOption';

export default class EdgeViewStream extends Transform {
  constructor(component) {
    super(option)

    this._component = component
  }
  _transform(action, encoding, done) {
    if (action.target === 'edge') {
      console.log('edge', action)
      this.push(action)
    } else {
      this.push(action)
    }

    done()
  }
}
