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

    this.bindActions(target.VIEW_NODE, [
      [actionType.CREATE, (action) => component.createNode(action.id, action.text)],
      [actionType.UPDATE_TEXT, (action) => component.updateNode(action.id, action.text)],
      [actionType.DELETE, (action) => component.deleteNode(action.id)],
      [actionType.MOVE, (action) => component.moveNode(action.id, action.x, action.y)],
      [actionType.SELECT, (action) => component.selectNode(action.id)],
      [actionType.UNSELECT, () => component.unselectNode()],
      [actionType.HOVER, (action) => component.hoverNode(action.id)],
      [actionType.UNHOVER, () => component.unhoverNode()]
    ])
  }
}
