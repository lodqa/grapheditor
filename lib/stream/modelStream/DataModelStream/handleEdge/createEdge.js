import {
  target
}
from '../../../const'

export default function(edges, nodes, action, push) {
  checkDuplicate(action.edges)

  action.edges.forEach(e => {
    let ret = edges.verify(e)
    console.assert(ret.isValid, ret.reason, action)

    push({
      target: target.VIEW_EDGE,
      sourceId: e.sourceId,
      targetId: e.targetId,
      label: e.label
    })
  })
}

function checkDuplicate(edges) {
  edges.reduce((exists, edge) => {
    let id = edge.sourceId + edge.targetId

    console.assert(!exists[id], 'Same edge exists already.', exists[id], edge)
    exists[id] = edge

    return exists
  }, {})
}
