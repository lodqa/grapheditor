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

    // Set by a binding aciton
    let endpoint,
      proxy

    this.bindActions(target.MODEL, [
      [actionType.SET_ENDPOINT, (action) => {
        endpoint = action.endpoint
        proxy = action.proxy
      }]
    ])

    this.bindActions(target.MODEL_NODE, [
      [actionType.UPDATE_MAPPINGS, (action, push) => findLabelOf(endpoint, proxy, action.mappings, target.MODEL_NODE, push)]
    ])

    this.bindActions(target.MODEL_EDGE, [
      [actionType.UPDATE_MAPPINGS, (action, push) => findLabelOf(endpoint, proxy, action.mappings, target.MODEL_EDGE, push)]
    ])
  }
}

const usageMessage = `The endpoint to fetch label of url of terms is not set. Set the endpoint by the setEndpoint API.
For example:
  editor.setEndpoint('http://rdf.pubannotation.org/sparql')`

function findLabelOf(endpoint, proxy, mappings, target, push) {
  if (endpoint) {
    for (let urls of Object.values(mappings)) {
      for (let url of urls) {
        push(findLabel(endpoint, proxy, url, target))
      }
    }
  } else {
    console.warn(usageMessage)
  }
}

function findLabel(endpoint, proxy, url, target) {
  return fetchLabel(endpoint, proxy, url)
    .then((label) => {
      return {
        target,
        type: actionType.UPDATE_LABEL,
        url,
        label
      }
    })
}
