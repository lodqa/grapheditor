import {
  actionType, target
}
from '../../const'

let handelers = {}
handelers[actionType.HOVER] = toNode
handelers[actionType.UNHOVER] = toNode

export default function(nodes, action, push) {
  if (handelers[action.type])
    handelers[action.type](nodes, action, push)
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
