import delegate from 'dom-delegate'
import extend from 'xtend'
import inputNodeComponent from '../../view/nodeEditor/inputNodeComponent'
import ActionReadable from '../ActionReadable'
import {
  actionType, target
}
from '../const'
import onSubmit from './onSubmit'

export default class extends ActionReadable {
  constructor(selector) {
    super(selector)
    this.name = 'InputNodeActionStream'
  }
  _bindComponent(selector, push) {
    let component = inputNodeComponent(selector),
      container = delegate(component.component)

    container.on('click', '.button', e => onSubmit(component, target.MODEL_NODE, actionType.CREATE, push))

    let inputHandler = e => {
      push(
        extend({
            target: target.MODEL_NODE,
            type: actionType.VALIDATE
          },
          component.value
        )
      )
    }

    container.on('input', '.label', inputHandler)
    container.on('input', '.url', inputHandler)
  }
}
