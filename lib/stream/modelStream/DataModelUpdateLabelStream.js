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
    this.name = 'DataModelUpdateLabelStream'

    this.bindActions(target.MODEL_NODE, [
      [actionType.UPDATE_LABEL, (action, push) => updateLabel(nodes, action.url, action.label, target.VIEW_NODE, push)]
    ])

    this.bindActions(target.MODEL_EDGE, [
      [actionType.UPDATE_LABEL, (action, push) => updateLabel(edges, action.url, action.label, target.VIEW_EDGE, push)]
    ])
  }
}

function updateLabel(model, url, label, target, push) {
  model.setLabel(url, label)

  push({
    target,
    type: actionType.SNAPSHOT,
    data: model.snapshot
  })
}
