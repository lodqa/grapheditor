import {
  ActionTransform
}
from 'action-stream'
import {
  actionType, target
}
from '../const'

let selectedNode = null
let selectedEdge = null

export default class extends ActionTransform {
  constructor() {
    super()
    this.name = 'SelectionModelStream'

    const clear = (action, push) => unselectAll(push)

    this.bindActions(target.MODEL_NODE, [
      // Record an egde creation type.
      [actionType.CREATE, (action) => (action.selectedNode = selectedNode)],
      [actionType.DELETE, clear],
      [actionType.SELECT, selectNode]
    ])

    this.bindActions(target.MODEL_EDGE, [
      [actionType.CREATE, clear],
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
  // Set id to the action if a node is selected
  if (selectNode) {
    action.target = target.MODEL_NODE
    action.id = selectedNode
  }

  if (selectedEdge) {
    Object.assign(action, selectedEdge, {
      target: target.VIEW_EDGE
    })
  }

  unselectAll(push)
}

function selectNode(action, push) {
  // Start to edit of the node when seleced node is reselected.
  if (selectedNode === action.id) {
    // Push an action to the model to get current texte value.
    push({
      target: target.MODEL_NODE,
      type: actionType.START_EDIT
    })
  } else {
    selectedNode = action.id
    unselectEdge(push)
    push(target.VIEW_NODE)
  }
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
    target,
    type: actionType.UNSELECT
  })
}
