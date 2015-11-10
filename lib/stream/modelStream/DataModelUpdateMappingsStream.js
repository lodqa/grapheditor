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
  constructor(nodes, edges) {
    super()
    this.name = 'DataModelUpdateMappingsStream'

    this.bindActions(target.MODEL_NODE, [
      [actionType.UPDATE_MAPPINGS, (action, push) => updateMappings(nodes, action.mappings, target.VIEW_NODE, push)]
    ])

    this.bindActions(target.MODEL_EDGE, [
      [actionType.UPDATE_MAPPINGS, (action, push) => updateMappings(edges, action.mappings, target.VIEW_EDGE, push)]
    ])
  }
}

function updateMappings(model, mappings, target, push) {
  model.setMappings(mappings)

  push({
    target,
    type: actionType.SNAPSHOT,
    data: model.snapshot
  })
}
