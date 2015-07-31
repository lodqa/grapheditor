import {
  ActionTransform
}
from 'action-stream'
import {
  actionType, target
}
from '../const'
import forward from './forward'

export default class extends ActionTransform {
  constructor() {
    super()
    this.name = 'UnselectRenderStream'

    let clear = (action, push) => unselectAll(push),
      selectNode = (action, push) => {
        unselectEdge(push)
        forward(push, target.VIEW_NODE)
      },
      selectEdge = (action, push) => {
        unselectNode(push)
        forward(push, target.EDITOR)
        forward(push, target.VIEW_EDGE)
      }

    // There is not CREATE, because an edge is created after node creation automatically.
    this.bindActions(target.MODEL_NODE, [
      [actionType.DELETE, clear],
      [actionType.SELECT, selectNode]
    ])

    this.bindActions(target.MODEL_EDGE, [
      [actionType.CREATE, clear],
      [actionType.DELETE, clear],
      [actionType.SELECT, selectEdge]
    ])
  }
}

function unselectAll(push) {
  unselectNode(push)
  unselectEdge(push)
}

function unselectNode(push) {
  unselect(push, target.VIEW_NODE)
}

function unselectEdge(push) {
  unselect(push, target.VIEW_EDGE)
  push({
    target: target.EDITOR,
    type: actionType.UNSELECT
  })
}

function unselect(push, target) {
  push({
    target: target,
    type: actionType.UNSELECT
  })
}
