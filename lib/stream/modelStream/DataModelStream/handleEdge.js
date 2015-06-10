import extend from 'xtend'
import {
  actionType, target
}
from '../../const'

let handelers = {}
handelers[actionType.AFTER_CREATE] = afterCreateEdge
handelers[actionType.CREATE] = createEdge
handelers[actionType.SELECT] = selectEdge
handelers[actionType.UPDATE] = updateEdge
handelers[actionType.VALIDATE] = validateEdge

export default function(edges, nodes, action, push) {
  if (handelers[action.type])
    handelers[action.type](edges, nodes, action, push)
}

function afterCreateEdge(edges, nodes, action, push) {
  if (edges.has(nodes, action)) {
    push({
      target: target.VIEW_EDGE,
      type: actionType.DETACH
    })
  } else {
    edges.add(nodes, action)

    push({
      target: target.VIEW_EDGE,
      type: actionType.SNAPSHOT,
      edges: edges.taArray()
    })

    if (!action.url) {
      push({
        target: target.VIEW_EDGE,
        type: actionType.SELECT,
        id: edges.getId(nodes, action)
      })
    }
  }
}

function createEdge(edges, nodes, action, push) {
  let ret = edges.verify(nodes, action)
  console.assert(ret.isValid, ret.reason, action)

  push({
    target: target.VIEW_EDGE,
    sourceId: nodes.getId(action.sourceUrl),
    targetId: nodes.getId(action.targetUrl)
  })
}

function selectEdge(edges, nodes, action, push) {
  push({
    target: target.VIEW_EDGE,
    id: edges.getId(nodes, action)
  })
}

function updateEdge(edges, nodes, action, push) {
  edges.set(nodes, action)

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

function validateEdge(edges, nodes, action, push) {
  push(
    extend({
      target: target.VIEW_EDGE,
    }, edges.verify(nodes, action))
  )
}
