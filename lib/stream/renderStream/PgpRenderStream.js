import {
  ActionTransform
}
from 'action-stream'
import {
  actionType, target
}
from '../const'
import pgpComponent from '../../view/pgpComponent'

export default class extends ActionTransform {
  constructor(selector) {
    super()
    let component = pgpComponent(selector)

    this.bindActions(target.VIEW_NODE, [
      [actionType.SNAPSHOT, (action, push) => component.setNode(action.data)]
    ])
    this.bindActions(target.VIEW_EDGE, [
      [actionType.SNAPSHOT, (action, push) => component.setEdge(action.edges)]
    ])
  }
}
