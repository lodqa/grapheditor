import {
  actionType, target
}
from '../../const'

export default function(edges) {
  return [
    [actionType.HOVER, (action, push) => toEdge(edges, action, push)],
    [actionType.UNHOVER, (action, push) => toEdge(edges, action, push)],
    [actionType.DELETE, (action, push) => deleteEdge(edges, action, push)]
  ]
}

function toEdge(edges, action, push) {
  let es = edges.arms(action.id)

  es.forEach(e => push(Object.assign(e, {
    target: target.VIEW_EDGE
  })))
}

function deleteEdge(edges, action, push) {
  let es = edges.arms(action.id)

  es.forEach(e => {
    edges.del(e)

    push(Object.assign(e, {
      target: target.VIEW_EDGE
    }))
  })

  push({
    target: target.VIEW_EDGE,
    type: actionType.SNAPSHOT,
    edges: edges.toArray()
  })
}
