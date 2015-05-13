import {
  Readable
}
from 'stream'

import option from '../defaultOption';
import extend from 'xtend'

export default class GraphActionStream extends Readable {
  constructor(component) {
    super(option)

    component.instance.bind('beforeDrop', info => this.push({
      target: 'edeg',
      type: 'beforeAdd',
      info: info
    }))

    component.instance.bind('connection', info => this.push({
      target: 'edge',
      type: 'afterAdd',
      info: info
    }))

    component.instance.bind('click', info => this.push({
      target: 'edge',
      type: 'edit',
      info: info
    }))
  }
  _read() {}
}
