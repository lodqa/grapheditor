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
      [actionType.CREATE, (action, push) => component.createNode(action.id, action.label, action.url)],
      [actionType.LOOKUP, (action, push) => {
        action.promise.then((mappings) => console.log(mappings))
      }],
      [actionType.UPDATE, (action, push) => component.updateNode(action.id, action.label, action.url)],
      [actionType.DELETE, (action, push) => component.deleteNode(action.id)],
      [actionType.MOVE, (action, push) => component.moveNode(action.id, action.x, action.y)],
      [actionType.SELECT, (action, push) => component.selectNode(action.id)],
      [actionType.UNSELECT, (action, push) => component.unselectNode()]
    ])
  }
}
