import delegate from 'dom-delegate'
import editEdgeComponent from '../../view/nodeEditor/editEdgeComponent'
import ActionReadable from '../ActionReadable'
import {
  actionType, target
}
from '../const'
import onSubmit from './onSubmit'

export default class extends ActionReadable {
  _bindComponent(selector, push) {
    let component = editEdgeComponent(selector),
      container = delegate(component.component)

    container.on('click', '.button', e => onSubmit(component, target.MODEL_EDGE, actionType.UPDATE, push))

    let inputHandler = e => push({
      target: target.EDIT_EDGE,
      type: actionType.INPUT
    })

    container.on('input', '.label', inputHandler)
    container.on('input', '.url', inputHandler)
    container.on('click', '.cancel-button', e => push({
      target: target.MODEL_EDGE,
      type: actionType.CANCEL
    }))
  }
}
