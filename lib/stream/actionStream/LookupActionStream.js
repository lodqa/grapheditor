import delegate from 'dom-delegate'
import {
  ActionReadable
}
from 'action-stream'
import lookupComponent from '../../view/lookupComponent'
import {
  actionType, target
}
from '../const'

export default class extends ActionReadable {
  constructor(selector) {
    super(selector)
    this.name = 'lookupActionStream'
  }
  _bindComponent(selector, push) {
    let component = lookupComponent(selector),
      container = delegate(component.component)

    container.on('click', '.button', e => push({
      target: target.MODEL_NODE,
      type: actionType.LOOKUP
    }))
  }
}
