import delegate from 'dom-delegate'
import editNodeComponent from '../../view/nodeEditor/editNodeComponent'
import ActionReadable from '../ActionReadable'
import {
  actionType, target
}
from '../const'
import onSubmit from './onSubmit'

export default class extends ActionReadable {
  _bindComponent(selector, push) {
    let component = editNodeComponent(selector),
      container = delegate(component.component)

    container.on('click', '.button', e => onSubmit(component, target.MODEL_NODE, actionType.UPDATE, push))

    let inputHandler = e => push({
      target: target.EDIT_NODE,
      type: actionType.INPUT
    })

    container.on('input', '.label', inputHandler)
    container.on('input', '.url', inputHandler)
    container.on('click', '.cancel-button', e => push({
      target: target.MODEL_NODE,
      type: actionType.CANCEL
    }))
  }
}
