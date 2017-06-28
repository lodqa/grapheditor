import {
  ActionTransform
}
from 'action-stream'
import {
  target,
  actionType
}
from '../const'
import pushSnapshot from './pushSnapshot'
import * as text from './text'

export default class extends ActionTransform {
  constructor(edges) {
    super()
    this.name = 'DataModelEdgeStream'

    this.bindActions(target.MODEL_EDGE, [
      [actionType.CREATE, (action, push) => createEdge(edges, action, push)],
      [actionType.DELETE, (action, push) => deleteEdge(edges, action, push)],
      [actionType.HOVER, (action, push) => push(target.VIEW_EDGE)],
      [actionType.UNHOVER, (action, push) => push(target.VIEW_EDGE)],
      [actionType.START_EDIT, (action, push) => text.appendText(edges, edges.toId(action), push, target.VIEW_EDGE)],
      [actionType.UPDATE_TEXT, (action, push) => text.update(edges, Object.assign(action, {id: edges.toId(action)}), push, target.VIEW_EDGE)],
      [actionType.UPDATE_TERM, (action, push) => text.updateTerm(edges, action, push, target.VIEW_EDGE)]
    ])
  }
}

function createEdge(model, action, push) {
  if (model.has(action)) {
    // Avoid duplcate edges.
    model.setDuplicateFlag(action, true)

    push({
      target: target.VIEW_EDGE,
      type: actionType.DELETE
    })
  } else if (action.sourceId === action.targetId) {
    // Avoid loopback edges.
    push({
      target: target.VIEW_EDGE,
      type: actionType.DELETE
    })
  } else {
    model.add(action)

    push(target.LAYOUT_EDGE)

    push({
      target: target.VIEW_EDGE,
      type: actionType.AFTER_CREATE
    })

    pushSnapshot(push, model, target.VIEW_EDGE)
  }
}

function deleteEdge(model, action, push) {
  if (model.has(action)) {
    if (model.getDuplicateFlag(action)) {
      // Same edge was detached by avoiding duplication.
      model.setDuplicateFlag(action, false)
    } else {
      // The edge is detache in the graph.
      model.del(action)

      push({
        target: target.LAYOUT_EDGE,
        type: actionType.DELETE
      })

      pushSnapshot(push, model, target.VIEW_EDGE)
    }
  }
}
