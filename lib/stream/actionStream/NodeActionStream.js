import {
  Readable
}
from 'stream'
import delegate from 'dom-delegate'
import option from '../defaultOption';

const TARGET_NODE = 'node'

export default class extends Readable {
  constructor(component) {
    super(option)

    let container = delegate(component.container)

    container.on('click', '.node', e => this.push({
      target: TARGET_NODE,
      type: 'select',
      id: e.target.id
    }))
  }
  _read() {}
}
