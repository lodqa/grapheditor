import {
  ActionTransform
}
from 'action-stream'
import {
  target,
  actionType
}
from '../../const'
import lookupNode from './lookupNode'

export default class extends ActionTransform {
  constructor(nodes, edges, lookupUrl) {
    super()
    this.name = 'DataModelLookupStream'

    this.bindActions(target.MODEL_NODE, [
      [actionType.LOOKUP, (action, push) => lookup(action, nodes, lookupUrl, push)]
    ])
  }
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
