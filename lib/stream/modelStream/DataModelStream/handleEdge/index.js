import {
  actionType, target
}
from '../../../const'
import forward from '../forward'

export default function(model, nodes) {
  return [
    [actionType.CREATE, (action, push) => createEdge(model, action, push)],
    [actionType.DELETE, (action, push) => deleteEdge(model, action, push)],
    [actionType.DETACH, (action, push) => detachEdge(model, action, push)],
    [actionType.HOVER, (action, push) => forward(push, target.VIEW_EDGE)],
    [actionType.UNHOVER, (action, push) => forward(push, target.VIEW_EDGE)]
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

    forward(push, target.LAYOUT_EDGE)

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

  forward(push, target.LAYOUT_EDGE)
  forward(push, target.VIEW_EDGE)

  push({
    target: target.VIEW_EDGE,
    type: actionType.SNAPSHOT,
    edges: model.toArray()
  })
}

function detachEdge(model, action, push) {
  if (model.has(action)) {
    if (model.getDuplicateFlag(action)) {
      model.setDuplicateFlag(action, false)
    } else {
      model.del(action)

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
