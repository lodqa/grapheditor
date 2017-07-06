import {
  ActionTransform
}
from 'action-stream'
import {
  actionType,
  target
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
      [actionType.DELETE, clear],
      [actionType.SELECT, selectNode]
    ])

    this.bindActions(target.MODEL_EDGE, [
      [actionType.CREATE, clear],
      [actionType.DELETE, clear],
      [actionType.SELECT, selectEdge],
      [actionType.UPDATE_TEXT, appendSelectedEdge]
    ])

    this.bindActions(target.MODEL, [
      [actionType.DELETE, deleteSelected],
      [actionType.START_EDIT, startEditSelected],
      [actionType.UNSELECT, clear]
    ])
  }
}

function startEditSelected(action, push) {
  // Set id to the action if a node is selected
  if (selectedNode) {
    push({
      target: target.MODEL_NODE,
      id: selectedNode
    })
  }

  if (selectedEdge) {
    push({
      target: target.MODEL_EDGE,
      sourceId: selectedEdge.sourceId,
      targetId: selectedEdge.targetId
    })
  }
}

function deleteSelected(action, push) {
  // Set id to the action if a node is selected
  if (selectedNode) {
    push({
      target: target.MODEL_NODE,
      id: selectedNode
    })
  }

  if (selectedEdge) {
    push({
      target: target.VIEW_EDGE,
      sourceId: selectedEdge.sourceId,
      targetId: selectedEdge.targetId
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
  if (selectedEdge && selectedEdge.sourceId === action.sourceId && selectedEdge.targetId === action.targetId) {
    // Push an action to the model to get current texte value.
    push({
      target: target.MODEL_EDGE,
      type: actionType.START_EDIT
    })
  } else {
    selectedEdge = {
      sourceId: action.sourceId,
      targetId: action.targetId
    }
    unselectNode(push)
    push(target.EDITOR)
    push(target.VIEW_EDGE)
  }
}

// Append id of selected edge to the action.
// Because the dom of edge on the graph dose not have id for model of that edge.
function appendSelectedEdge(action) {
  // Nothing is overwrite unless selected edge.
  // No edge is selected when text of edge is changed on the edge table.
  // Because any edge in the graph is unselected when input element outside the graph is selected.
  Object.assign(action, selectedEdge)
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
