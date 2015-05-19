import {
  Readable
}
from 'stream'

import option from '../defaultOption';
import inputNodeComponent from '../../view/inputNodeComponent'
import extend from 'xtend'
import delegate from 'dom-delegate'

export default class extends Readable {
  constructor(selector) {
    super(option)

    let component = inputNodeComponent(selector),
      container = delegate(component.component)

    container.on('click', '.button', e => onClick(component, this))

    let inputHandler = e => this.push({
      target: 'input-node',
      type: 'input'
    })

    container.on('input', '.label', inputHandler)
    container.on('input', '.url', inputHandler)
  }
  _read() {}
}

function onClick(component, stream) {
  stream.push(
    extend({
        target: 'node',
        type: 'create'
      },
      component.value
    )
  )
}
