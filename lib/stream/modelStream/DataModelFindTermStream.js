import {
  ActionTransform
}
from 'action-stream'
import {
  target,
  actionType
}
from '../const'
import fetchTerm from './fetch/fetchTerm'

export default class extends ActionTransform {
  constructor(nodes, edges, findTermUrl) {
    super()
    this.name = 'DataModelFindTermStream'

    // Set by a binding aciton
    let dictionaryUrl

    this.bindActions(target.MODEL, [
      [actionType.SET_DICTIONARY_URL, (action) => {
        dictionaryUrl = action.dictionaryUrl
      }],
      [actionType.FIND_TERM, (action, push) => {
        // Call nodes and edges separatly to set result there separatly.
        push(findTermOf(findTermUrl, dictionaryUrl, nodes.texts, nodes, target.MODEL_NODE))
        push(findTermOf(findTermUrl, dictionaryUrl, edges.texts, edges, target.MODEL_EDGE))
      }]
    ])

    this.bindActions(target.MODEL_NODE, [
      [actionType.FIND_TERM, (action, push) => {
        let texts = [nodes.getText(action.id)]

        push(findTermOf(findTermUrl, dictionaryUrl, texts, nodes, target.MODEL_NODE))
      }]
    ])

    this.bindActions(target.MODEL_EDGE, [
      [actionType.FIND_TERM, (action, push) => {
        let texts = [edges.getText(action.id)]

        push(findTermOf(findTermUrl, dictionaryUrl, texts, edges, target.MODEL_EDGE))
      }]
    ])
  }
}

function findTermOf(findTermUrl, dictionaryUrl, texts, model, target) {
  return fetchTerm(
      findTermUrl,
      dictionaryUrl,
      texts
    )
    .then((mappings) => {
      return {
        target,
        type: actionType.UPDATE_MAPPINGS,
        mappings
      }
    })
}
