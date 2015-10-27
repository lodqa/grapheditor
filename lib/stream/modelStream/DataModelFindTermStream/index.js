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
    this.name = 'DataModelFindTermStream'

    // Set by a binding aciton
    let dictionaryUrl

    this.bindActions(target.MODEL, [
      [actionType.SET_DICTIONARY_URL, (action) => {
        dictionaryUrl = action.dictionaryUrl
      }],
      [actionType.FIND_TERM, (action, push) => {
        push(findTermOf(findTermUrl, dictionaryUrl, nodes.texts, nodes, target.VIEW_NODE))
        push(findTermOf(findTermUrl, dictionaryUrl, edges.texts, edges, target.VIEW_EDGE))
      }]
    ])

    this.bindActions(target.MODEL_NODE, [
      [actionType.FIND_TERM, (action, push) => {
        let texts = [nodes.getText(action.id)]

        push(findTermOf(findTermUrl, dictionaryUrl, texts, nodes, target.VIEW_NODE))
      }]
    ])

    this.bindActions(target.MODEL_EDGE, [
      [actionType.FIND_TERM, (action, push) => {
        let texts = [edges.getText(action.id)]

        push(findTermOf(findTermUrl, dictionaryUrl, texts, edges, target.VIEW_EDGE))
      }]
    ])
  }
}

function findTermOf(findTermUrl, dictionaryUrl, texts, model, target) {
  return findTerm(
      findTermUrl,
      dictionaryUrl,
      texts
    )
    .then((value) => {
      model.setMappings(value)

      return {
        target,
        type: actionType.SNAPSHOT,
        data: model.snapshot
      }
    })
}
