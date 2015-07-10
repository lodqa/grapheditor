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
import lookpuNode from './lookpuNode'

export default class extends ActionTransform {
  constructor(nodes, edges, lookupUrl) {
    super()
    this.name = 'DataModelStream'

    let asyncPush = (sourceAction, mixin) => this.push(Object.assign({}, sourceAction, mixin))

    this.bindActions(target.MODEL_NODE, handleNode(nodes))
    this.bindActions(target.MODEL_NODE, [
      [actionType.LOOKUP, (action, push) => lookup(action, push, nodes, lookupUrl, asyncPush)]
    ])
    this.bindActions(target.MODEL_NODE, handleAssociatedEdge(edges))
    this.bindActions(target.MODEL_EDGE, handleEdge(edges, nodes))
    this.bindActions(target.MODEL_EDGE, handleAssociatedNode(nodes))
  }
}

function lookup(action, push, nodes, lookupUrl, asyncPush) {
  let callback = (newAction) => asyncPush(action, newAction)

  lookpuNode(
    nodes,
    lookupUrl,
    push,
    callback
  )
}
