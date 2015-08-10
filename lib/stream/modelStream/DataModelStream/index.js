import {
  ActionTransform
}
from 'action-stream'
import {
  target,
  actionType
}
from '../../const'
import handleNode from './handleNode'
import handleEdge from './handleEdge'
import handleAssociatedEdge from './handleAssociatedEdge'
import handleAssociatedNode from './handleAssociatedNode'
import lookupNode from './lookupNode'

export default class extends ActionTransform {
  constructor(nodes, edges, lookupUrl) {
    super()
    this.name = 'DataModelStream'

    this.bindActions(target.MODEL_NODE, handleNode(nodes))
    this.bindActions(target.MODEL_NODE, [
      [actionType.LOOKUP, (action, push) => lookup(action, nodes, lookupUrl, push)],
      [actionType.CREATE, (action, push) => autoEdgeCreation(action, nodes, push)]
    ])
    this.bindActions(target.MODEL_NODE, handleAssociatedEdge(edges))
    this.bindActions(target.MODEL_EDGE, handleEdge(edges, nodes))
    this.bindActions(target.MODEL_EDGE, handleAssociatedNode(nodes))
  }
}

function autoEdgeCreation(action, nodes, push) {
  // A new node is created already.
  let nodeList = nodes.toArray()

  if (nodes.toArray().length > 1) {
    let [sourceId, targetId] = getArms(nodeList, action.selectedNode, action.createEdge)

    push({
      target: target.VIEW_EDGE,
      sourceId: sourceId,
      targetId: targetId,
      label: null
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

function lookup(action, nodes, lookupUrl, push) {
  let labels,
    callback = (newAction) => asyncPush(action, newAction)

  if (action.id) {
    labels = [nodes.getLabel(action.id)]
  } else {
    labels = nodes.getLabels()
  }

  push(
    lookupNode(
      nodes,
      lookupUrl,
      labels,
      callback
    )
  )
}
