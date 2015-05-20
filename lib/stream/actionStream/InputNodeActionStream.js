import {
  Readable
}
from 'stream'

import delegate from 'dom-delegate'
import inputNodeComponent from '../../view/nodeEditor/inputNodeComponent'
import option from '../defaultOption';
import onSubmit from './onSubmit'

export default class extends Readable {
  constructor(selector) {
    super(option)

    let component = inputNodeComponent(selector),
      container = delegate(component.component)

    container.on('click', '.button', e => onSubmit(component, 'create', this))

    let inputHandler = e => this.push({
      target: 'input-node',
      type: 'input'
    })

    container.on('input', '.label', inputHandler)
    container.on('input', '.url', inputHandler)
  }
  _read() {}
}
