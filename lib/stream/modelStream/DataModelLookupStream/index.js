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

    this.bindActions(target.MODEL, [
      [actionType.SET_DICTIONARY_URL, (action) => {
        this._dictionaryUrl = action.dictionaryUrl
      }]
    ])

    this.bindActions(target.MODEL_NODE, [
      [actionType.LOOKUP, (action, push) => lookup(action, nodes, lookupUrl, this._dictionaryUrl, push)]
    ])
  }
}

function lookup(action, nodes, lookupUrl, dictionaryUrl, push) {
  let texts

  if (action.id) {
    texts = [nodes.getText(action.id)]
  } else {
    texts = nodes.getTexts()
  }

  push(
    lookupNode(
      nodes,
      lookupUrl,
      dictionaryUrl,
      texts
    )
  )
}
