import {
  Readable
}
from 'stream'

import option from '../defaultOption';
import graphComponent from '../../view/graphComponent'

const TARGET_EDGE = 'edge'

export default class extends Readable {
  constructor(selector) {
    super(option)

    let component = graphComponent(selector)

    component.instance.bind('beforeDrop', info => this.push({
      target: TARGET_EDGE,
      type: 'beforeCreate',
      info: info
    }))

    component.instance.bind('connection', info => this.push({
      target: TARGET_EDGE,
      type: 'afterCreate',
      info: info,
      sourceId: info.sourceId,
      targetId: info.targetId,
      label: info.connection.getOverlay("label").label
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
