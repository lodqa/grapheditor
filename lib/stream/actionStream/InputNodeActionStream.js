import delegate from 'dom-delegate'
import inputNodeComponent from '../../view/nodeEditor/inputNodeComponent'
import ActionReadable from '../ActionReadable'
import {
  actionType, target
}
from '../const'
import onSubmit from './onSubmit'

export default class extends ActionReadable {
  _bindComponent(selector, push) {
    let component = inputNodeComponent(selector),
      container = delegate(component.component)

    container.on('click', '.button', e => onSubmit(component, target.MODEL_NODE, actionType.CREATE, push))

    let inputHandler = e => push({
      target: target.INPUT_NODE,
      type: actionType.INPUT
    })

    container.on('input', '.label', inputHandler)
    container.on('input', '.url', inputHandler)
  }
}
