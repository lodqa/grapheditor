import {
  target
}
from '../../../const'

export default function(action, push) {
  checkDuplicate(action.edges)

  action.edges.forEach(e => {
    push({
      target: target.VIEW_EDGE,
      sourceId: e.sourceId,
      targetId: e.targetId
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
