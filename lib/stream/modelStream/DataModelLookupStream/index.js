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
  constructor(nodes, edges, lookupUrl, dictionaryUrl) {
    super()
    this.name = 'DataModelLookupStream'
    this._dictionaryUrl = dictionaryUrl


    this.bindActions(target.MODEL_NODE, [
      [actionType.LOOKUP, (action, push) => lookup(action, nodes, lookupUrl, this._dictionaryUrl, push)],
      [actionType.SET_DICTIONARY_URL, (action, push) => {
        this._dictionaryUrl = action.dictionaryUrl
      }]
    ])
  }
}

function lookup(action, nodes, lookupUrl, dictionaryUrl, push) {
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
      dictionaryUrl,
      labels,
      callback
    )
  )
}
