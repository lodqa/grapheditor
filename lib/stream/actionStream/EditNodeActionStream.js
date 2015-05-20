import {
  Readable
}
from 'stream'

import delegate from 'dom-delegate'
import editNodeComponent from '../../view/editNodeComponent'
import option from '../defaultOption';
import onSubmit from './onSubmit'

export default class extends Readable {
  constructor(selector) {
    super(option)

    let component = editNodeComponent(selector),
      container = delegate(component.component)

    container.on('click', '.button', e => onSubmit(component, 'update', this))

    let inputHandler = e => this.push({
      target: 'edit-node',
      type: 'input'
    })

    container.on('input', '.label', inputHandler)
    container.on('input', '.url', inputHandler)
    container.on('click', '.cancel-button', e => this.push({
      target: 'node',
      type: 'unselect'
    }))
  }
  _read() {}
}
