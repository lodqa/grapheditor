import 'babel/polyfill'
import global from 'global'

import actionStream from './lib/stream/actionStream'
import modelStream from './lib/stream/modelStream'
import renderStream from './lib/stream/renderStream'
import {
  actionType, target
}
from './lib/stream/const'

global.graphEditor = function graphEditor(lookupUrl) {
  let topStream = actionStream()

  topStream
    .pipe(modelStream(lookupUrl))
    .pipe(renderStream())

  topStream.addPgp = (pgp) => addPgp(topStream, pgp)
  topStream.setDictionaryUrl = (dictionaryUrl, predDictionaryUrl) => setDictionaryUrl(topStream, dictionaryUrl, predDictionaryUrl)

  return topStream
}

function setDictionaryUrl(stream, dictionaryUrl, predDictionaryUrl) {
  if (predDictionaryUrl == null) {
    predDictionaryUrl = dictionaryUrl
  }
  stream.push({
    source: ['graph-editor.js'],
    target: target.MODEL,
    type: actionType.SET_DICTIONARY_URL,
    dictionaryUrl,
    predDictionaryUrl
  })
}

function addPgp(stream, pgp) {
  if (pgp && pgp.nodes) {
    for (let id of Object.keys(pgp.nodes)) {
      stream.push({
        source: ['graph-editor.js'],
        target: target.MODEL_NODE,
        type: actionType.CREATE,
        id,
        text: pgp.nodes[id].text
      })
    }

    stream.push({
      source: ['graph-editor.js'],
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
          source: ['graph-editor.js'],
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
