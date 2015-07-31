import delegate from 'dom-delegate'
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

    container.on('click', '.delete-button', e => putValue(component, target.VIEW_EDGE, actionType.DELETE, push))
  }
}
