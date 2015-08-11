import {
  ActionTransform
}
from 'action-stream'
import {
  actionType, target
}
from '../const'

let selectedNode = null,
  selectedEdge = null

export default class extends ActionTransform {
  constructor() {
    super()
    this.name = 'SelectionModelStream'

    let clear = (action, push) => unselectAll(push),
      autoCreateEgdeType

    this.bindActions(target.MODEL_NODE, [
      // Record an egde creation type.
      [actionType.CREATE, (action, push) => {
        autoCreateEgdeType = action.createEdge
        action.selectedNode = selectedNode
      }],
      [actionType.DELETE, clear],
      [actionType.SELECT, selectNode]
    ])

    this.bindActions(target.MODEL_EDGE, [
      [actionType.CREATE, (action, push) => {
        clear(action, push)

        // Select a node according to the edge creation type.
        if (autoCreateEgdeType) {
          if (autoCreateEgdeType === 'chain') {
            selectedNode = action.targetId
          } else if (autoCreateEgdeType === 'star') {
            selectedNode = action.sourceId
          }

          push({
            target: target.VIEW_NODE,
            type: actionType.SELECT,
            id: selectedNode
          })

          autoCreateEgdeType === null
        }
      }],
      [actionType.DELETE, clear],
      [actionType.SELECT, selectEdge]
    ])

    this.bindActions(target.MODEL, [
      [actionType.DELETE, deleteSelected],
      [actionType.UNSELECT, clear]
    ])
  }
}

function deleteSelected(action, push) {
  if (selectedNode) {
    action.id = selectedNode
    action.target = target.MODEL_NODE
  }

  if (selectedEdge)
    Object.assign(action, selectedEdge, {
      target: target.VIEW_EDGE
    })

  unselectAll(push)
}

function selectNode(action, push) {
  selectedNode = action.id
  unselectEdge(push)
  push(target.VIEW_NODE)
}

function selectEdge(action, push) {
  selectedEdge = {
    sourceId: action.sourceId,
    targetId: action.targetId
  }
  unselectNode(push)
  push(target.EDITOR)
  push(target.VIEW_EDGE)
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
  unselect(push, target.EDITOR)
}

function unselect(push, target) {
  push({
    target: target,
    type: actionType.UNSELECT
  })
}
