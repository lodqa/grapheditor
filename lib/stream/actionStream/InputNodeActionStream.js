import {
  Readable
}
from 'stream'

import option from '../defaultOption';
import extend from 'xtend'

export default class InputNodeActionStream extends Readable {
  constructor(component) {
    super(option)

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
  let type;
  if (component.isExistNode) {
    type = 'update'
  } else {
    type = 'create'
  }

  stream.push(
    extend({
        target: 'node',
        type: type
      },
      component.value
    )
  )
}
