import {
  ActionTransform
}
from 'action-stream'
import {
  target,
  actionType
}
from '../const'
import fetchLabel from './fetch/fetchLabel'

export default class extends ActionTransform {
  constructor() {
    super()
    this.name = 'DataModelFindLabelStream'

    const endpoint = 'http://rdf.pubannotation.org/sparql'

    this.bindActions(target.MODEL_NODE, [
      [actionType.UPDATE_MAPPINGS, (action, push) => findLabelOf(endpoint, action.mappings, target.MODEL_NODE, push)]
    ])

    this.bindActions(target.MODEL_EDGE, [
      [actionType.UPDATE_MAPPINGS, (action, push) => findLabelOf(endpoint, action.mappings, target.MODEL_EDGE, push)]
    ])
  }
}

function findLabelOf(endpoint, mappings, target, push) {
  for (let urls of Object.values(mappings)) {
    for (let url of urls) {
      push(findLabel(endpoint, url, target))
    }
  }
}

function findLabel(endpoint, url, target) {
  return fetchLabel(endpoint, url)
    .then((label) => {
      return {
        target,
        type: actionType.UPDATE_LABEL,
        url,
        label
      }
    })
}
