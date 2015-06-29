import {
  ActionTransform
}
from 'action-stream'
import {
  actionType, target
}
from '../const'
import edgeTableComponent from '../../view/edgeTableComponent'

export default class extends ActionTransform {
  constructor(selector) {
    super()
    let component = edgeTableComponent(selector)

    this.bindActions(target.VIEW_EDGE, [
      [actionType.SNAPSHOT, (action, push) => component.set(action.edges)],
      [actionType.SELECT, (action, push) => component.select(action.sourceId, action.targetId)],
      [actionType.UNSELECT, (action, push) => component.unselect()],
      [actionType.HOVER, (action, push) => component.hover(action.sourceId, action.targetId)],
      [actionType.UNHOVER, (action, push) => component.unhover(action.sourceId, action.targetId)]
    ])
  }
}
