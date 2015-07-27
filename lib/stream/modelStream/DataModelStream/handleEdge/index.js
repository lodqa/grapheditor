import {
  actionType, target
}
from '../../../const'
import createEdge from './createEdge'

export default function(edges, nodes) {
  return [
    [actionType.AFTER_CREATE, (action, push) => afterCreateEdge(edges, action, push)],
    [actionType.CREATE, (action, push) => createEdge(edges, nodes, action, push)],
    [actionType.DELETE, (action, push) => deleteEdge(edges, action, push)],
    [actionType.DETACH, (action, push) => detachEdge(edges, action, push)],
    [actionType.HOVER, (action, push) => toView(edges, action, push)],
    [actionType.SELECT, (action, push) => selectEdge(edges, action, push)],
    [actionType.UNHOVER, (action, push) => toView(edges, action, push)],
    [actionType.UPDATE, (action, push) => updateEdge(edges, action, push)],
    [actionType.VALIDATE, (action, push) => validateEdge(edges, action, push)]
  ]
}

function afterCreateEdge(edges, action, push) {
  if (edges.has(action)) {
    edges.setDuplicateFlag(action, true)

    push({
      target: target.VIEW_EDGE,
      type: actionType.DETACH
    })
  } else {
    edges.add(action)

    push({
      target: target.VIEW_EDGE
    })

    push({
      target: target.VIEW_EDGE,
      type: actionType.SNAPSHOT,
      edges: edges.toArray()
    })
  }
}

function selectEdge(edges, action, push) {
  let id = edges.getId(action)
  console.assert(id, 'No id of the edge.', action)

  push({
    target: target.VIEW_EDGE,
    id: id
  })
}

function updateEdge(edges, action, push) {
  edges.set(action)

  push(
    Object.assign(
      edges.get(action.id), {
        target: target.VIEW_EDGE
      }
    )
  )

  push({
    target: target.VIEW_EDGE,
    type: actionType.SNAPSHOT,
    edges: edges.toArray()
  })
}

function deleteEdge(edges, action, push) {
  let [sourceId, targetId] = edges.del(action.id)

  push({
    sourceId: sourceId,
    targetId: targetId,
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
        target: target.VIEW_EDGE,
        type: actionType.SNAPSHOT,
        edges: edges.toArray()
      })
    }
  }
}

function validateEdge(edges, action, push) {
  push(
    Object.assign({
      target: target.VIEW_EDGE,
    }, edges.verify(action))
  )
}

function toView(edges, action, push) {
  push({
    target: target.VIEW_EDGE
  })
}
