import {
  ActionReadable
}
from 'action-stream'
import extend from 'xtend'
import {
  actionType, target
}
from '../const'
import forceDirectedLayoutComponent from '../../view/forceDirectedLayoutComponent'

export default class extends ActionReadable {
  constructor(selector) {
    super(selector)
    this.name = 'ForceDirectedLayoutActionStream'
  }
  _bindComponent(selector, push) {
    let component = forceDirectedLayoutComponent()

    component.setOnMove((val) => push(extend(val, {
      target: target.VIEW_NODE,
      type: actionType.MOVE,
    })))
  }
}
