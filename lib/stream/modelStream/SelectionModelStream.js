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
    this.name = 'UnselectRenderStream'

    let clear = (action, push) => unselectAll(push)

    // There is not CREATE, because an edge is created after node creation automatically.
    this.bindActions(target.MODEL_NODE, [
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
