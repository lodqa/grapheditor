import delegate from 'dom-delegate'
import extend from 'xtend'
import editEdgeComponent from '../../view/nodeEditor/editEdgeComponent'
import ActionReadable from '../ActionReadable'
import {
  actionType, target
}
from '../const'
import onSubmit from './onSubmit'

export default class extends ActionReadable {
  constructor(selector) {
    super(selector)
    this.name = 'EditEdgeActionStream'
  }
  _bindComponent(selector, push) {
    let component = editEdgeComponent(selector),
      container = delegate(component.component)

    container.on('click', '.button', e => onSubmit(component, target.MODEL_EDGE, actionType.UPDATE, push))

    let inputHandler = e => {
      push(
        extend({
            target: target.MODEL_EDGE,
            type: actionType.VALIDATE
          },
          component.value
        )
      )
    }

    container.on('input', '.label', inputHandler)
    container.on('input', '.url', inputHandler)
    container.on('click', '.cancel-button', e => push({
      target: target.VIEW_EDGE,
      type: actionType.CANCEL
    }))
  }
}
