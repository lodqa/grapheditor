import global from 'global'
import polyfill from 'babel/polyfill'

import actionStream from './lib/stream/actionStream'
import modelStream from './lib/stream/modelStream'
import renderStream from './lib/stream/renderStream'
import {
  actionType, target
}
from './lib/stream/const'

global.graphEditor = function(lookupUrl, dictionaryUrl) {
  let topStream = actionStream()

  topStream
    .pipe(modelStream(lookupUrl, dictionaryUrl))
    .pipe(renderStream())

  topStream.addPgp = (pgp) => addPgp(topStream, pgp)
  topStream.setDictionaryUrl = (dictionaryUrl) => setDictionaryUrl(topStream, dictionaryUrl)

  return topStream
}

function setDictionaryUrl(stream, dictionaryUrl) {
  stream.push({
    source: ['graph-editor.js'],
    target: target.MODEL_NODE,
    type: actionType.SET_DICTIONARY_URL,
    dictionaryUrl: dictionaryUrl
  })
}

function addPgp(stream, pgp) {
<<<<<<< HEAD
  if (pgp && pgp.nodes) {
=======
  if (pgp.nodes) {
>>>>>>> dcd086d6555d26d6b7b85811ba19930bf1d53b02
    for (let id in pgp.nodes) {
      stream.push({
        source: ['graph-editor.js'],
        target: target.MODEL_NODE,
        type: actionType.CREATE,
        id: id,
        label: pgp.nodes[id].text
      })
    }

    stream.push({
      source: ['graph-editor.js'],
      target: target.MODEL_NODE,
      type: actionType.FOCUS,
      id: pgp.focus
    })
  }

<<<<<<< HEAD
  if (pgp && pgp.edges) {
=======
  if (pgp.edges) {
>>>>>>> dcd086d6555d26d6b7b85811ba19930bf1d53b02
    // Wait for creations of nodes.
    global.setTimeout(() => {
      for (let edge of pgp.edges) {
        stream.push({
          source: ['graph-editor.js'],
          target: target.VIEW_EDGE,
          type: actionType.CREATE,
          sourceId: edge.subject,
          targetId: edge.object
        })
      }
    }, 1)
  }
}
