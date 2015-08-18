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
  constructor(nodes) {
    super()
    this.name = 'DataModelNodeStream'

    this.bindActions(target.MODEL_NODE, [
      [actionType.CREATE, (action, push) => createNode(nodes, action, push)],
      [actionType.CREATE, (action, push) => autoEdgeCreation(action, nodes, push)],
      [actionType.FOCUS, (action, push) => setFocus(nodes, action, push)],
      [actionType.DELETE, (action, push) => deleteNode(nodes, action, push)],
      [actionType.HOVER, (action, push) => push(target.VIEW_NODE)],
      [actionType.UNHOVER, (action, push) => push(target.VIEW_NODE)],
      [actionType.UPDATE_LABEL, (action, push) => updateNodeLabel(nodes, action, push)],
      [actionType.UPDATE_TERM, (action, push) => updateNodeTerm(nodes, action, push)],
      [actionType.VALIDATE, (action, push) => validateNode(nodes, action, push)]
    ])
  }
}

function setFocus(model, action, push) {
  model.focus = action.id
  snapsoht(push, model)
}

function createNode(model, action, push) {
  console.assert(action.label, 'A node MUST have the label.', action)

  let id = model.add(action)

  push({
    target: target.LAYOUT_NODE,
    id: id
  })

  push(target.EDITOR)

  push({
    target: target.VIEW_NODE,
    id: id
  })

  snapsoht(push, model)
}

function updateNodeLabel(model, action, push) {
  // Push actions only when the label is changed.
  if (model.setLabel(action)) {
    push(target.VIEW_NODE)
    snapsoht(push, model)
  }
}

function updateNodeTerm(model, action, push) {
  // Push actions only when the terms are changed.
  if (model.setTerm(action))
    snapsoht(push, model)
}

function deleteNode(model, action, push) {
  model.del(action.id)

  push(target.LAYOUT_NODE)
  push(target.VIEW_NODE)
  snapsoht(push, model)
}

function snapsoht(push, model) {
  push({
    target: target.VIEW_NODE,
    type: actionType.SNAPSHOT,
    data: model.snapshot
  })
}

function validateNode(model, action, push) {
  push(
    Object.assign({
      target: target.EDITOR
    }, model.verify(action))
  )
}

function autoEdgeCreation(action, nodes, push) {
  // A new node is created already.
  let nodeList = nodes.snapshot.list

  if (nodeList.length > 1 && action.createEdge) {
    let [sourceId, targetId] = getArms(nodeList, action.selectedNode, action.createEdge)

    push({
      target: target.VIEW_EDGE,
      sourceId: sourceId,
      targetId: targetId
    })
  }
}

function getArms(nodeList, selectedNode, createEdge) {
  let sourceId

  if (selectedNode) {
    sourceId = selectedNode
  } else if (createEdge === 'chain') {
    sourceId = nodeList[nodeList.length - 2].id
  } else {
    sourceId = nodeList[0].id
  }

  return [sourceId, nodeList[nodeList.length - 1].id]
}
