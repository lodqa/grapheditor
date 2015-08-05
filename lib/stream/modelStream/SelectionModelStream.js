import {
  ActionTransform
}
from 'action-stream'
import {
  actionType, target
}
from '../const'
import forward from './forward'

let selectedNode = null,
  selectedEdge = null

export default class extends ActionTransform {
  constructor() {
    super()
    this.name = 'UnselectRenderStream'

    let clear = (action, push) => unselectAll(push),
      selectNode = (action, push) => {
        selectedNode = action.id
        unselectEdge(push)
        forward(push, target.VIEW_NODE)
      },
      selectEdge = (action, push) => {
        selectedEdge = {
          sourceId: action.sourceId,
          targetId: action.targetId
        }
        unselectNode(push)
        forward(push, target.EDITOR)
        forward(push, target.VIEW_EDGE)
      }

    // There is not CREATE, because an edge is created after node creation automatically.
    this.bindActions(target.MODEL_NODE, [
      [actionType.DELETE, (action, push) => clear],
      [actionType.SELECT, selectNode],
      [actionType.UNSELECT, (action, push) => unselectNode(push)]
    ])

    this.bindActions(target.MODEL_EDGE, [
      [actionType.CREATE, clear],
      [actionType.DELETE, clear],
      [actionType.SELECT, selectEdge],
      [actionType.UNSELECT, (action, push) => unselectEdge(push)]
    ])

    this.bindActions(target.MODEL, [
      [actionType.DELETE, (action, push) => {
        if (selectedNode) {
          action.id = selectedNode
          action.target = target.MODEL_NODE
        }

        if (selectedEdge)
          Object.assign(action, selectedEdge, {
            target: target.VIEW_EDGE
          })

        unselectAll(push)
      }]
    ])
  }
}

function unselectAll(push) {
  unselectNode(push)
  unselectEdge(push)
}

function unselectNode(push) {
  selectedNode = null
  unselect(push, target.VIEW_NODE)
}

function unselectEdge(push) {
  selectedEdge = null
  unselect(push, target.VIEW_EDGE)
  push({
    target: target.EDITOR,
    type: actionType.UNSELECT
  })
}

function unselect(push, target) {
  push({
    target: target,
    type: actionType.UNSELECT
  })
}
