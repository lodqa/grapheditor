import {
  Readable
}
from 'stream'

import option from '../defaultOption';
import editNodeComponent from '../../view/editNodeComponent'
import extend from 'xtend'
import delegate from 'dom-delegate'

export default class extends Readable {
  constructor(selector) {
    super(option)

    let component = editNodeComponent(selector),
      container = delegate(component.component)

    container.on('click', '.button', e => onClick(component, this))

    let inputHandler = e => this.push({
      target: 'edit-node',
      type: 'input'
    })

    container.on('input', '.label', inputHandler)
    container.on('input', '.url', inputHandler)
    container.on('click', '.cancel-button', e => this.push({
      target: 'edit-node',
      type: 'cancel'
    }))
  }
  _read() {}
}

function onClick(component, stream) {
  stream.push(
    extend({
        target: 'node',
        type: 'update'
      },
      component.value
    )
  )
}
