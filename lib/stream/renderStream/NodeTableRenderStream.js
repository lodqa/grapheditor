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
      [actionType.HOVER, (action, push) => component.hover(action.id)],
      [actionType.SELECT, (action, push) => component.select(action.id)],
      [actionType.SNAPSHOT, (action, push) => component.set(action.nodes)],
      [actionType.UNHOVER, (action, push) => component.unhover(action.id)],
      [actionType.UNSELECT, (action, push) => component.unselect()]
    ])
  }
}
