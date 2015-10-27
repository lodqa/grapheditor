import {
  ActionTransform
}
from 'action-stream'
import {
  target,
  actionType
}
from '../../const'
import findTerm from './findTerm'

export default class extends ActionTransform {
  constructor(nodes, edges, findTermUrl) {
    super()
    this.name = 'DataModelLookupStream'

    // Set by a binding aciton
    let dictionaryUrl

    this.bindActions(target.MODEL, [
      [actionType.SET_DICTIONARY_URL, (action) => {
        dictionaryUrl = action.dictionaryUrl
      }]
    ])

    this.bindActions(target.MODEL_NODE, [
      [actionType.FIND_TERM, (action, push) => lookup(action, nodes, findTermUrl, dictionaryUrl, push)]
    ])
  }
}

function lookup(action, nodes, findTermUrl, dictionaryUrl, push) {
  let texts

  if (action.id) {
    texts = [nodes.getText(action.id)]
  } else {
    texts = nodes.getTexts()
  }

  push(
    findTerm(
      nodes,
      findTermUrl,
      dictionaryUrl,
      texts
    )
  )
}
