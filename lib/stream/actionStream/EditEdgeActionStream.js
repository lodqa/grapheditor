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

export default class extends ActionReadable {
  constructor(selector) {
    super(selector)
    this.name = 'EditEdgeActionStream'
  }
  _bindComponent(selector, push) {
    let component = editEdgeComponent(selector),
      container = delegate(component.component)

    container.on('click', '.delete-button', () => push({
      target: target.MODEL,
      type: actionType.DELETE
    }))
  }
}
