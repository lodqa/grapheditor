import {
  Readable
}
from 'stream'

import option from './defaultOption';
import extend from 'xtend'

export default class InputNodeControllerStream extends Readable {
  constructor(component) {
    super(option)

    component.button.addEventListener('click', e => this.push(
      extend({
          type: 'node',
          action: 'add'
        },
        component.value
      )
    ))

    let inputHandler = e => this.push({
      type: 'view',
      action: 'input'
    })

    component.label.addEventListener('input', inputHandler)
    component.url.addEventListener('input', inputHandler)
  }
  _read() {}
}
