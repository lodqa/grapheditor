import {
  ActionReadable
}
from 'action-stream'
import {
  actionType, target
}
from '../const'
import forceDirectedLayoutComponent from '../../view/forceDirectedLayoutComponent'

export default class extends ActionReadable {
  constructor() {
    super()
    this.name = 'ForceDirectedLayoutActionStream'
  }
  _bindComponent(selector, push) {
    let component = forceDirectedLayoutComponent()

    component.setOnMove((val) => push(Object.assign(val, {
      target: target.VIEW_NODE,
      type: actionType.MOVE,
    })))
  }
}
