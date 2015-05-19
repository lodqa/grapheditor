import {
  Readable
}
from 'stream'

import option from '../defaultOption';
import editNodeComponent from '../../view/editNodeComponent'
import extend from 'xtend'

export default class extends Readable {
  constructor(selector) {
    super(option)

    let component = editNodeComponent(selector)
    component.button.addEventListener('click', e => onClick(component, this))

    let inputHandler = e => this.push({
      target: 'edit-node',
      type: 'input'
    })

    component.label.addEventListener('input', inputHandler)
    component.url.addEventListener('input', inputHandler)
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
