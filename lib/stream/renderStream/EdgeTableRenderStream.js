import {
  ActionTransform
}
from 'action-stream'
import {
  actionType, target
}
from '../const'
import edgeTableComponent from '../../view/table/edgeTableComponent'

export default class extends ActionTransform {
  constructor(selector) {
    super()
    let component = edgeTableComponent(selector)

    this.bindActions(target.VIEW_EDGE, [
      [actionType.SNAPSHOT, (action) => component.set(action.edges)],
      [actionType.SELECT, (action) => component.select(action.sourceId, action.targetId)],
      [actionType.UNSELECT, (action) => component.unselect()],
      [actionType.HOVER, (action) => component.hover(action.sourceId, action.targetId)],
      [actionType.UNHOVER, (action) => component.unhover(action.sourceId, action.targetId)]
    ])
  }
}
