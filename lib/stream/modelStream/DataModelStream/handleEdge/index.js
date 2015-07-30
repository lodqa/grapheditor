import {
  actionType, target
}
from '../../../const'
import forward from '../forward'

export default function(model, nodes) {
  return [
    [actionType.CREATE, (action, push) => createEdge(model, action, push)],
    [actionType.DETACH, (action, push) => detachEdge(model, action, push)],
    [actionType.HOVER, (action, push) => forward(push, target.VIEW_EDGE)],
    [actionType.UNHOVER, (action, push) => forward(push, target.VIEW_EDGE)]
  ]
}

function createEdge(model, action, push) {
  if (model.has(action)) {
    // Avoid duplcate edges.
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

    snapShot(push, model)
  }
}

function detachEdge(model, action, push) {
  if (model.has(action)) {
    if (model.getDuplicateFlag(action)) {
      // Same edge was detached by avoiding duplication.
      model.setDuplicateFlag(action, false)
    } else {
      // The edge is detache in the graph.
      model.del(action)

      push({
        target: target.LAYOUT_EDGE,
        type: actionType.DELETE
      })

      snapShot(push, model)
    }
  }
}

function snapShot(push, model) {
  push({
    target: target.VIEW_EDGE,
    type: actionType.SNAPSHOT,
    edges: model.toArray()
  })
}
