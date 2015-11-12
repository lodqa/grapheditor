import 'babel/polyfill'
import global from 'global'

import actionStream from './lib/stream/actionStream'
import modelStream from './lib/stream/modelStream'
import renderStream from './lib/stream/renderStream'
import {
  actionType, target
}
from './lib/stream/const'

const source = ['graph-editor.js']

global.graphEditor = function graphEditor(lookupUrl) {
  let topStream = actionStream()

  topStream
    .pipe(modelStream(lookupUrl))
    .pipe(renderStream())

  topStream.addPgp = (pgp) => addPgp(topStream, pgp)
  topStream.setDictionaryUrl = (dictionaryUrl) => setDictionaryUrl(topStream, dictionaryUrl)
  topStream.setEndpoint = (endpoint, proxy) => setEndpoint(topStream, endpoint, proxy)

  return topStream
}

function setDictionaryUrl(stream, dictionaryUrl) {
  stream.push({
    source,
    target: target.MODEL,
    type: actionType.SET_DICTIONARY_URL,
    dictionaryUrl
  })
}

function setEndpoint(stream, endpoint, proxy) {
  stream.push({
    source,
    target: target.MODEL,
    type: actionType.SET_ENDPOINT,
    endpoint,
    proxy
  })
}

function addPgp(stream, pgp) {
  if (pgp && pgp.nodes) {
    for (let id of Object.keys(pgp.nodes)) {
      stream.push({
        source,
        target: target.MODEL_NODE,
        type: actionType.CREATE,
        id,
        text: pgp.nodes[id].text
      })
    }

    stream.push({
      source,
      target: target.MODEL_NODE,
      type: actionType.FOCUS,
      id: pgp.focus
    })
  }

  if (pgp && pgp.edges) {
    // Wait for creations of nodes.
    global.setTimeout(() => {
      for (let edge of pgp.edges) {
        stream.push({
          source,
          target: target.VIEW_EDGE,
          type: actionType.CREATE,
          sourceId: edge.subject,
          targetId: edge.object,
          text: edge.text
        })
      }
    }, 1)
  }
}
