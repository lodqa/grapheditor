import delegate from 'dom-delegate'
import {
  ActionReadable
}
from 'action-stream'
import inputNodeComponent from '../../view/nodeEditor/inputNodeComponent'
import {
  actionType, target
}
from '../const'
import putValue from './putValue'

export default class extends ActionReadable {
  constructor(selector) {
    super(selector)
    this.name = 'InputNodeActionStream'
  }
  _bindComponent(selector, push) {
    let component = inputNodeComponent(selector),
      container = delegate(component.component),
      inputHandler = e => putValue(component, target.MODEL_NODE, actionType.VALIDATE, push)

    container.on('input', '.label', inputHandler)
    container.on('click', '.button', e => putValue(component, target.MODEL_NODE, actionType.CREATE, push))
  }
}
