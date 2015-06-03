import extend from 'xtend'
import actionType from '../../actionType'

export default function(edges, nodes, action, push) {
  switch (action.type) {
    case actionType.CREATE:
      push(
        extend(
          action, {
            sourceId: nodes.getId(action.sourceUrl),
            targetId: nodes.getId(action.targetUrl)
          }
        )
      )
      break
    case 'afterCreate':
      if (edges.verify(nodes, action)) {
        edges.add(nodes, action)

        push({
          target: 'edge',
          type: actionType.SNAPSHOT,
          edges: edges.taArray()
        })

        if (!action.url) {
          push(extend(action, {
            type: actionType.SELECT
          }))
        }
      } else {
        push(extend(action, {
          type: actionType.DETACH
        }))
      }
      break;
    case actionType.UPDATE:
      edges.set(nodes, action)
      push({
        target: 'edge',
        type: actionType.SNAPSHOT,
        edges: edges.taArray()
      })

  }
}
