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
      [actionType.HOVER, (action) => component.hover(action.sourceId, action.targetId)],
      [actionType.HOVER_TERM, (action) => component.hoverTerm(action.id, action.index)],
      [actionType.SELECT, (action) => component.select(action.sourceId, action.targetId)],
      [actionType.SNAPSHOT, (action) => component.set(action.data)],
      [actionType.UNSELECT, () => component.unselect()],
      [actionType.UNHOVER, (action) => component.unhover(action.sourceId, action.targetId)],
      [actionType.UNHOVER_TERM, () => component.unhoverTerm()]
    ])
  }
}
