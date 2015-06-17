import delegate from 'dom-delegate'
import extend from 'xtend'
import {
  ActionReadable
}
from 'action-stream'
import editEdgeComponent from '../../view/nodeEditor/editEdgeComponent'
import {
  actionType, target
}
from '../const'
import putValue from './putValue'

export default class extends ActionReadable {
  constructor(selector) {
    super(selector)
    this.name = 'EditEdgeActionStream'
  }
  _bindComponent(selector, push) {
    let component = editEdgeComponent(selector),
      container = delegate(component.component)

    container.on('click', '.button', e => putValue(component, target.MODEL_EDGE, actionType.UPDATE, push))

    let inputHandler = e => putValue(component, target.MODEL_EDGE, actionType.VALIDATE, push)

    container.on('input', '.label', inputHandler)
    container.on('input', '.url', inputHandler)
    container.on('click', '.cancel-button', e => push({
      target: target.VIEW_EDGE,
      type: actionType.CANCEL
    }))
  }
}
