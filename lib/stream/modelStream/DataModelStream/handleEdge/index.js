import {
  actionType, target
}
from '../../../const'

export default function(edges, nodes) {
  return [
    [actionType.CREATE, (action, push) => createEdge(edges, action, push)],
    [actionType.DELETE, (action, push) => deleteEdge(edges, action, push)],
    [actionType.DETACH, (action, push) => detachEdge(edges, action, push)],
    [actionType.HOVER, (action, push) => toView(edges, action, push)],
    [actionType.UNHOVER, (action, push) => toView(edges, action, push)]
  ]
}

function createEdge(edges, action, push) {
  if (edges.has(action)) {
    edges.setDuplicateFlag(action, true)

    push({
      target: target.VIEW_EDGE,
      type: actionType.DELETE
    })
  } else {
    edges.add(action)

    push({
      target: target.LAYOUT_EDGE,
      type: actionType.CREATE
    })

    push({
      target: target.VIEW_EDGE,
      type: actionType.AFTER_CREATE
    })

    push({
      target: target.VIEW_EDGE,
      type: actionType.SNAPSHOT,
      edges: edges.toArray()
    })
  }
}

function deleteEdge(edges, action, push) {
  edges.del(action)

  push({
    sourceId: action.sourceId,
    targetId: action.targetId,
    target: target.VIEW_EDGE,
    type: actionType.DELETE
  })

  push({
    target: target.VIEW_EDGE,
    type: actionType.SNAPSHOT,
    edges: edges.toArray()
  })
}

function detachEdge(edges, action, push) {
  if (edges.has(action)) {
    let edge = edges.get(edges.getId(action))

    if (edges.getDuplicateFlag(action)) {
      edges.setDuplicateFlag(action, false)
    } else {
      edges.del(edges.getId(action))

      push({
        target: target.LAYOUT_EDGE,
        type: actionType.DELETE
      })

      push({
        target: target.VIEW_EDGE,
        type: actionType.SNAPSHOT,
        edges: edges.toArray()
      })
    }
  }
}

function toView(edges, action, push) {
  push({
    target: target.VIEW_EDGE
  })
}
