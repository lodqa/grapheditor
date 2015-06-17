import delegate from 'dom-delegate'
import extend from 'xtend'
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
      container = delegate(component.component)

    container.on('click', '.button', e => putValue(component, target.MODEL_NODE, actionType.CREATE, push))

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
