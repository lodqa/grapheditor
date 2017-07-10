import {
  ActionTransform
}
from 'action-stream'
import {
  actionType, target
}
from '../../const'
import graphComponent from '../../../view/graphComponent'

export default class extends ActionTransform {
  constructor(selector) {
    super()

    const component = graphComponent(selector)

    this.bindActions(target.VIEW_NODE, [
      [actionType.CREATE, (action) => component.createNode(action.id, action.text)],
      [actionType.END_EDIT, (action) => component.endEditNode(action.id)],
      [actionType.UPDATE_TEXT, (action) => component.updateNode(action.id, action.text)],
      [actionType.DELETE, (action) => component.deleteNode(action.id)],
      [actionType.FOCUS, (action) => component.focusNode(action.id)],
      [actionType.MOVE, (action) => component.moveNode(action.id, action.x, action.y)],
      [actionType.SELECT, (action) => component.selectNode(action.id)],
      [actionType.START_EDIT, (action) => component.startEditNode(action.id, action.text)],
      [actionType.UNSELECT, () => component.unselectNode()],
      [actionType.HOVER, (action) => component.hoverNode(action.id)],
      [actionType.UNHOVER, () => component.unhoverNode()]
    ])
  }
}
