import {
  ActionTransform
}
from 'action-stream'
import {
  target,
  actionType
}
from '../../const'
import toInformation from './toInformation'
import done from './done'

export default class extends ActionTransform {
  constructor(nodes, edges, findTermUrl) {
    super()
    this.name = 'DataModelFindTermStream'

    // Set by a binding aciton
    let dictionaryUrl

    const urls = [
      findTermUrl,
      dictionaryUrl
    ]

    this.bindActions(target.MODEL, [
      [actionType.SET_DICTIONARY_URL, (action) => dictionaryUrl = action.dictionaryUrl],
      [actionType.FIND_TERM, (action, push) => done(push, [
        toInformation(nodes, nodes.texts, target.VIEW_NODE, ...urls),
        toInformation(edges, edges.texts, target.VIEW_EDGE, ...urls)
      ])]
    ])

    this.bindActions(target.MODEL_NODE, [
      [actionType.FIND_TERM, (action, push) => done(push, [
        toInformation(nodes, [nodes.getText(action.id)], target.VIEW_NODE, ...urls)
      ])]
    ])

    this.bindActions(target.MODEL_EDGE, [
      [actionType.FIND_TERM, (action, push) => done(push, [
        toInformation(edges, [edges.getText(action.id)], target.VIEW_EDGE, ...urls)
      ])]
    ])
  }
}
