import {
  ActionTransform
}
from 'action-stream'
import {
  target,
  actionType
}
from '../const'

export default class extends ActionTransform {
  constructor(nodes) {
    super()
    this.name = 'DataModelAssociatedNodeStream'

    let edgeToNode = (action, push) => toNode(nodes, action, push)

    this.bindActions(target.MODEL_EDGE, [
      [actionType.HOVER, edgeToNode],
      [actionType.UNHOVER, edgeToNode]
    ])
  }
}

function toNode(nodes, action, push) {
  push({
    target: target.VIEW_NODE,
    id: action.sourceId
  })

  push({
    target: target.VIEW_NODE,
    id: action.targetId
  })
}
