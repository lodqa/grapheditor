import {
  Readable
}
from 'stream'

import option from '../defaultOption';
import inputNodeComponent from '../../view/inputNodeComponent'
import extend from 'xtend'

export default class extends Readable {
  constructor(selector) {
    super(option)

    let component = inputNodeComponent(selector)
    component.button.addEventListener('click', e => onClick(component, this))

    let inputHandler = e => this.push({
      target: 'view',
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
        type: 'create'
      },
      component.value
    )
  )
}
