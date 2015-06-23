import extend from 'xtend'
import {
  actionType, target
}
from '../../../const'
import createEdge from './createEdge'

let handelers = {}
handelers[actionType.AFTER_CREATE] = afterCreateEdge
handelers[actionType.CREATE] = createEdge
handelers[actionType.SELECT] = selectEdge
handelers[actionType.UPDATE] = updateEdge
handelers[actionType.VALIDATE] = validateEdge
handelers[actionType.DELETE] = deleteEdge

export default function(edges, nodes, action, push) {
  if (handelers[action.type])
    handelers[action.type](edges, nodes, action, push)
}

function afterCreateEdge(edges, nodes, action, push) {
  if (edges.has(action)) {
    push({
      target: target.VIEW_EDGE,
      type: actionType.DETACH
    })
  } else {
    edges.add(action)

    push({
      target: target.VIEW_EDGE,
      type: actionType.SNAPSHOT,
      edges: edges.taArray()
    })

    if (!action.url) {
      push({
        target: target.VIEW_EDGE,
        type: actionType.SELECT,
        id: edges.getId(action)
      })
    }
  }
}

function selectEdge(edges, nodes, action, push) {
  let id = edges.getId(action)
  console.assert(id, 'No id of the edge.', action)

  push({
    target: target.VIEW_EDGE,
    id: id
  })
}

function updateEdge(edges, nodes, action, push) {
  edges.set(action)

  push(
    extend(
      edges.get(action.id), {
        target: target.VIEW_EDGE
      }
    )
  )
  push({
    target: target.VIEW_EDGE,
    type: actionType.SNAPSHOT,
    edges: edges.taArray()
  })
}

function deleteEdge(edges, nodes, action, push) {
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
    edges: edges.taArray()
  })
}

function validateEdge(edges, nodes, action, push) {
  push(
    extend({
      target: target.VIEW_EDGE,
    }, edges.verify(action))
  )
}