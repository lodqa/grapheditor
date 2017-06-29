import createHtmlElement from './lib/createHtmlElement'
import actionStream from './lib/stream/actionStream'
import modelStream from './lib/stream/modelStream'
import renderStream from './lib/stream/renderStream'
import {
  actionType, target
}
from './lib/stream/const'

window.graphEditor = function graphEditor(lookupUrl) {
  createHtmlElement()

  const topStream = actionStream()

  topStream
    .pipe(modelStream(lookupUrl))
    .pipe(renderStream())

  topStream.addPgp = (pgp) => addPgp(topStream, pgp)
  topStream.setDictionaryUrl = (dictionaryUrl, predDictionaryUrl) => setDictionaryUrl(topStream, dictionaryUrl, predDictionaryUrl)

  return topStream
}

function setDictionaryUrl(stream, dictionaryUrl, predDictionaryUrl) {
  stream.push({
    source: ['graph-editor.js'],
    target: target.MODEL,
    type: actionType.SET_DICTIONARY_URL,
    dictionaryUrl,
    predDictionaryUrl: predDictionaryUrl || dictionaryUrl
  })
}

function addPgp(stream, pgp) {
  if (pgp && pgp.nodes) {
    for (const id of Object.keys(pgp.nodes)) {
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
    setTimeout(() => {
      for (const edge of pgp.edges) {
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
