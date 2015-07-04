import {
  actionType, target
}
from '../../const'

export default function(nodes, action, push) {
  let edgeToNode = (action, push) => toNode(nodes, action, push)

  return [
    [actionType.HOVER, edgeToNode],
    [actionType.UNHOVER, edgeToNode]
  ]
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
