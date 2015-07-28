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

  topStream.addNodes = (nodes) => addNodes(topStream, nodes)
  topStream.addEdges = (edges) => addEdges(topStream, edges)

  return topStream
}

function addNodes(stream, nodes) {
  nodes.forEach(n => addNode(stream, n))
}

function addNode(stream, node) {
  stream.push(Object.assign({
    source: ['index.js'],
    target: target.MODEL_NODE,
    type: actionType.CREATE,
  }, node))
}

function addEdges(stream, edges) {
  checkDuplicate(edges)

  edges.forEach(e => {
    stream.push({
      source: ['index.js'],
      target: target.VIEW_EDGE,
      type: actionType.CREATE,
      sourceId: e.sourceId,
      targetId: e.targetId
    })
  })
}

function checkDuplicate(edges) {
  edges.reduce((exists, edge) => {
    let id = edge.sourceId + edge.targetId

    console.assert(!exists[id], 'Same edge exists already.', exists[id], edge)
    exists[id] = edge

    return exists
  }, {})
}
