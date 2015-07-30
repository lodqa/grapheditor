import {
  actionType, target
}
from '../../../const'

export default function(model, nodes) {
  return [
    [actionType.CREATE, (action, push) => createEdge(model, action, push)],
    [actionType.DELETE, (action, push) => deleteEdge(model, action, push)],
    [actionType.DETACH, (action, push) => detachEdge(model, action, push)],
    [actionType.HOVER, (action, push) => toView(model, action, push)],
    [actionType.UNHOVER, (action, push) => toView(model, action, push)]
  ]
}

function createEdge(model, action, push) {
  if (model.has(action)) {
    model.setDuplicateFlag(action, true)

    push({
      target: target.VIEW_EDGE,
      type: actionType.DELETE
    })
  } else {
    model.add(action)

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
      edges: model.toArray()
    })
  }
}

function deleteEdge(model, action, push) {
  model.del(action)

  push({
    sourceId: action.sourceId,
    targetId: action.targetId,
    target: target.VIEW_EDGE,
    type: actionType.DELETE
  })

  push({
    target: target.LAYOUT_EDGE,
    type: actionType.DELETE
  })

  push({
    target: target.VIEW_EDGE,
    type: actionType.SNAPSHOT,
    edges: model.toArray()
  })
}

function detachEdge(model, action, push) {
  if (model.has(action)) {
    let edge = model.get(model.getId(action))

    if (model.getDuplicateFlag(action)) {
      model.setDuplicateFlag(action, false)
    } else {
      model.del(model.getId(action))

      push({
        target: target.LAYOUT_EDGE,
        type: actionType.DELETE
      })

      push({
        target: target.VIEW_EDGE,
        type: actionType.SNAPSHOT,
        edges: model.toArray()
      })
    }
  }
}

function toView(model, action, push) {
  push({
    target: target.VIEW_EDGE
  })
}
