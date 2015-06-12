import {
  target
}
from '../../../const'

export default function(edges, nodes, action, push) {
  checkDuplicate(action.edges)

  action.edges.forEach(e => {
    let ret = edges.verify(nodes, e)
    console.assert(ret.isValid, ret.reason, action)

    push({
      target: target.VIEW_EDGE,
      sourceId: nodes.getId(e.sourceUrl),
      targetId: nodes.getId(e.targetUrl),
      label: e.label,
      url: e.url
    })
  })
}

function checkDuplicate(edges) {
  edges.reduce((exists, edge) => {
    let id = edge.sourceUrl + edge.targetUrl

    console.assert(!exists[id], 'Same edge exists already.', exists[id], edge)
    exists[id] = edge

    return exists
  }, {})
}
