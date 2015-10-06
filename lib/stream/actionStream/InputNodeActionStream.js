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
      pushValidate = () => putValue(component, target.MODEL_NODE, actionType.VALIDATE, push),
      pushCreate = () => putValue(component, target.MODEL_NODE, actionType.CREATE, push)

    container.on('input', '.label', pushValidate)

    container.on('keyup', '.label', (e) => {
      if (e.key === 'Enter' && component.value.label) {
        pushCreate()
      }
    })

    component
      .component
      .querySelector('button')
      .addEventListener('click', () => pushCreate())
  }
}
