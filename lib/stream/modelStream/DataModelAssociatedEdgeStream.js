import {
  ActionTransform
}
from 'action-stream'
import {
  target,
  actionType
}
from '../const'

export default class extends ActionTransform {
  constructor(edges) {
    super()
    this.name = 'DataModelAssociatedEdgeStream'

    this.bindActions(target.MODEL_NODE, [
      [actionType.HOVER, (action, push) => toEdge(edges, action, push)],
      [actionType.UNHOVER, (action, push) => toEdge(edges, action, push)],
      [actionType.DELETE, (action, push) => deleteEdge(edges, action, push)]
    ])
  }
}

function toEdge(edges, action, push) {
  let es = edges.arms(action.id)

  es.forEach((e) => push(Object.assign(e, {
    target: target.VIEW_EDGE
  })))
}

function deleteEdge(edges, action, push) {
  let es = edges.arms(action.id)

  es.forEach((e) => {
    edges.del(e)

    push({
      target: target.VIEW_EDGE,
      sourceId: e.sourceId,
      targetId: e.targetId
    })
  })

  push({
    target: target.VIEW_EDGE,
    type: actionType.SNAPSHOT,
    data: edges.snapshot
  })
}
