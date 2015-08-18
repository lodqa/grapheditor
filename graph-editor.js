import global from 'global'
import polyfill from 'babel/polyfill'

import actionStream from './lib/stream/actionStream'
import modelStream from './lib/stream/modelStream'
import renderStream from './lib/stream/renderStream'
import {
  actionType, target
}
from './lib/stream/const'

global.graphEditor = function(lookupUrl) {
  let topStream = actionStream()

  topStream
    .pipe(modelStream(lookupUrl))
    .pipe(renderStream())

  topStream.addPgp = (pgp) => addPgp(topStream, pgp)

  return topStream
}

function addPgp(stream, pgp) {
  for (let id in pgp.nodes) {
    stream.push({
      source: ['graph-editor.js'],
      target: target.MODEL_NODE,
      type: actionType.CREATE,
      id: id,
      label: pgp.nodes[id].text
    })
  }

  // Wait for creations of nodes.
  requestAnimationFrame(() => {
    for (let edge of pgp.edges) {
      stream.push({
        source: ['graph-editor.js'],
        target: target.VIEW_EDGE,
        type: actionType.CREATE,
        sourceId: edge.subject,
        targetId: edge.object
      })
    }
  })
}
