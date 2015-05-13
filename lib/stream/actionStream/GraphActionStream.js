import {
  Readable
}
from 'stream'

import option from '../defaultOption';
import extend from 'xtend'

const TARGET_EDGE = 'edge'

export default class GraphActionStream extends Readable {
  constructor(component) {
    super(option)

    component.instance.bind('beforeDrop', info => this.push({
      target: TARGET_EDGE,
      type: 'beforeAdd',
      info: info
    }))

    component.instance.bind('connection', info => this.push({
      target: TARGET_EDGE,
      type: 'afterAdd',
      info: info
    }))

    component.instance.bind('click', c => this.push({
      target: TARGET_EDGE,
      type: 'select',
      connection: c
    }))

    component.instance.bind('dblclick', c => this.push({
      target: TARGET_EDGE,
      type: 'edit',
      connection: c
    }))
  }
  _read() {}
}
