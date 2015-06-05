import {
  actionType, target
}
from '../../const'

export default function(edges, nodes, action, push) {
  switch (action.type) {
    case actionType.CREATE:
      push({
        target: target.VIEW_EDGE,
        sourceId: nodes.getId(action.sourceUrl),
        targetId: nodes.getId(action.targetUrl)
      })
      break
    case actionType.AFTER_CREATE:
      if (edges.verify(nodes, action)) {
        edges.add(nodes, action)

        push({
          target: target.VIEW_EDGE,
          type: actionType.SNAPSHOT,
          edges: edges.taArray()
        })

        if (!action.url) {
          push({
            target: target.VIEW_EDGE,
            type: actionType.SELECT
          })
        }
      } else {
        push({
          target: target.VIEW_EDGE,
          type: actionType.DETACH
        })
      }
      break
    case actionType.UPDATE:
      edges.set(nodes, action)
      push({
        target: target.VIEW_EDGE
      })
      push({
        target: target.VIEW_EDGE,
        type: actionType.SNAPSHOT,
        edges: edges.taArray()
      })
      break
    case actionType.SELECT:
      push({
        target: target.VIEW_EDGE
      })
  }
}
