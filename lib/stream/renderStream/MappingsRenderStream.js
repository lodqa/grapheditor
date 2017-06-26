import {
  ActionTransform
}
from 'action-stream'
import {
  actionType, target
}
from '../const'
import pgpComponent from '../../view/mappingsComponent'

export default class extends ActionTransform {
  constructor(selector) {
    super()
    const component = pgpComponent(selector)

    this.bindActions(target.VIEW_NODE, [
      [actionType.SNAPSHOT, (action) => component.setNode(action.data)]
    ])

    this.bindActions(target.VIEW_EDGE, [
      [actionType.SNAPSHOT, (action) => component.setEdge(action.data)]
    ])
  }
}
