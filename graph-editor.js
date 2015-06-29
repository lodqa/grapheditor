import global from 'global'
import polyfill from 'babel/polyfill'

import actionStream from './lib/stream/actionStream'
import modelStream from './lib/stream/modelStream'
import renderStream from './lib/stream/renderStream'
import {
  actionType, target
}
from './lib/stream/const'

global.graphEditor = function() {
  let topStream = actionStream()

  topStream
    .pipe(modelStream())
    .pipe(renderStream())

  topStream.addNodes = (edges) => addNodes(topStream, edges)
  topStream.addEdges = (edges) => addEdges(topStream, edges)

  return topStream
}

function addNodes(stream, nodes) {
  nodes.forEach(n => addNode(stream, n.label, n.url))
}

function addNode(stream, label, url) {
  stream.push({
    source: ['index.js'],
    target: target.MODEL_NODE,
    type: actionType.CREATE,
    label: label,
    url: url
  })
}

function addEdges(stream, edges) {
  stream.push({
    source: ['index.js'],
    target: target.MODEL_EDGE,
    type: actionType.CREATE,
    edges: edges
  })
}
