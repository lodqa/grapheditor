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
      [actionType.UPDATE_TEXT, (action, push) => text.update(nodes, action, push, target.VIEW_NODE)],
      [actionType.UPDATE_TERM, (action, push) => text.updateTerm(nodes, action, push, target.VIEW_NODE)],
      [actionType.VALIDATE, (action, push) => validateNode(nodes, action, push)]
    ])
  }
}

function createNode(model, action, push) {
  console.assert(action.text, 'A node MUST have the text.', action)

  let id = model.add(action)

  push({
    target: target.LAYOUT_NODE,
    id
  })

  push(target.EDITOR)

  push({
    target: target.VIEW_NODE,
    id
  })

  pushSnapshot(push, model, target.VIEW_NODE)
}

function setFocus(model, action, push) {
  model.focus = action.id
  pushSnapshot(push, model, target.VIEW_NODE)
}

function deleteNode(model, action, push) {
  model.del(action.id)

  push(target.LAYOUT_NODE)
  push(target.VIEW_NODE)
  pushSnapshot(push, model, target.VIEW_NODE)
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
      sourceId,
      targetId,
      text: ''
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
