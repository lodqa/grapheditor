import extend from 'xtend'
import {
  actionType, target
}
from '../../const'

let handelers = {}
handelers[actionType.HOVER] = toEdge
handelers[actionType.UNHOVER] = toEdge
handelers[actionType.DELETE] = deleteEdge

export default function(edges, nodes, action, push) {
  if (handelers[action.type])
    handelers[action.type](edges, action, push)
}

function toEdge(edges, action, push) {
  let es = edges.arms(action.id)

  es.forEach(e => push(extend(e, {
    target: target.VIEW_EDGE
  })))
}

function deleteEdge(edges, action, push) {
  let es = edges.arms(action.id)

  es.forEach(e => {
    edges.del(e.id)

    push(extend(e, {
      target: target.VIEW_EDGE
    }))
  })

  push({
    target: target.VIEW_EDGE,
    type: actionType.SNAPSHOT,
    edges: edges.taArray()
  })
}
