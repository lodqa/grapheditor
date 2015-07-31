import {
  ActionTransform
}
from 'action-stream'
import {
  actionType, target
}
from '../const'

export default class extends ActionTransform {
  constructor() {
    super()
    this.name = 'UnselectRenderStream'

    // There is not CREATE, because an edge is created after node creation automatically.
    this.bindActions(target.MODEL_NODE, [
      [actionType.DELETE, unselectBoth],
      [actionType.SELECT, (action, push) => {
        unselectEdge(action, push)
        push({
          target: target.VIEW_NODE
        })
      }]
    ])

    this.bindActions(target.MODEL_EDGE, [
      [actionType.CREATE, unselectBoth],
      [actionType.DELETE, unselectBoth],
      [actionType.SELECT, (action, push) => {
        unselectNode(action, push)
        push({
          target: target.VIEW_EDGE
        })
      }]
    ])
  }
}

function unselectNode(action, push) {
  unselect(push, target.VIEW_NODE)
}

function unselectEdge(action, push) {
  unselect(push, target.VIEW_EDGE)
}

function unselectBoth(action, push) {
  unselect(push, target.VIEW_NODE)
  unselect(push, target.VIEW_EDGE)
}

function unselect(push, target) {
  push({
    target: target,
    type: actionType.UNSELECT
  })
}
