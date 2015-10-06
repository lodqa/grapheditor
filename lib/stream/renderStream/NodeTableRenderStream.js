import {
  ActionTransform
}
from 'action-stream'
import {
  actionType, target
}
from '../const'
import nodeTableComponent from '../../view/nodeTableComponent'

export default class extends ActionTransform {
  constructor(selector) {
    super()
    let component = nodeTableComponent(selector)

    this.bindActions(target.VIEW_NODE, [
      [actionType.HOVER, (action) => component.hover(action.id)],
      [actionType.HOVER_TERM, (action) => component.hoverTerm(action.id, action.index)],
      [actionType.SELECT, (action) => component.select(action.id)],
      [actionType.SNAPSHOT, (action) => component.set(action.data)],
      [actionType.UNHOVER, (action) => component.unhover(action.id)],
      [actionType.UNHOVER_TERM, () => component.unhoverTerm()],
      [actionType.UNSELECT, () => component.unselect()]
    ])
  }
}
