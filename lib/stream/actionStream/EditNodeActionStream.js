import delegate from 'dom-delegate'
import extend from 'xtend'
import editNodeComponent from '../../view/nodeEditor/editNodeComponent'
import ActionReadable from '../ActionReadable'
import {
  actionType, target
}
from '../const'
import onSubmit from './onSubmit'

export default class extends ActionReadable {
  constructor(selector) {
    super(selector)
    this.name = 'EditNodeActionStream'
  }
  _bindComponent(selector, push) {
    let component = editNodeComponent(selector),
      container = delegate(component.component)

    container.on('click', '.button', e => onSubmit(component, target.MODEL_NODE, actionType.UPDATE, push))

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
    container.on('click', '.cancel-button', e => push({
      target: target.VIEW_NODE,
      type: actionType.CANCEL
    }))
  }
}
