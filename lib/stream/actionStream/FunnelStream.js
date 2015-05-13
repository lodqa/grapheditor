import {
  Transform
}
from 'stream'

import option from '../defaultOption';
export default class FunnelStream extends Transform {
  constructor() {
    super(option)
  }
  _transform(action, encoding, done) {
    console.debug('FunnelStream', action);
    this.push(action)
    done()
  }
}
