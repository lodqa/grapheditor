import {
  Readable
}
from 'stream'

import option from '../defaultOption';
import extend from 'xtend'

export default class GraphActionStream extends Readable {
  constructor(component) {
    super(option)

    component.instance.bind('connection', c => this.push({
      target: 'edge',
      type: 'preAdd',
      connector: c
    }))
  }
  _read() {}
}
