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
      [actionType.CREATE, (action, push) => component.createEdge(action.sourceId, action.targetId, action.label, action.url)],
      [actionType.SELECT, (action, push) => component.selectEdge(action.connection)],
      [actionType.DETACH, (action, push) => component.detachEdge(action.connection)],
      [actionType.DELETE, (action, push) => component.deleteEdge(action.sourceId, action.targetId)],
      [actionType.UPDATE, (action, push) => component.updateEdge(action.sourceId, action.targetId, action.label, action.url)],
      [actionType.UNSELECT, (action, push) => component.unselectEdge()],
      [actionType.HOVER, (action, push) => component.hoverNode(action.sourceId, action.targetId)],
      [actionType.UNHOVER, (action, push) => component.unhoverNode()]
    ])
  }
}
