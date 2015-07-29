import {
  ActionTransform
}
from 'action-stream'
import {
  actionType, target
}
from '../const'
import graphComponent from '../../view/graphComponent'

export default class extends ActionTransform {
  constructor(selector) {
    super()
    let component = graphComponent(selector)

    this.bindActions(target.VIEW_EDGE, [
      [actionType.CREATE, (action, push) => component.createEdge(action)],
      [actionType.SELECT, (action, push) => component.selectEdge(action)],
      [actionType.DELETE, (action, push) => component.deleteEdge(action)],
      [actionType.UNSELECT, (action, push) => component.unselectEdge()],
      [actionType.HOVER, (action, push) => component.hoverEdge(action)],
      [actionType.UNHOVER, (action, push) => component.unhoverEdge()]
    ])
  }
}
