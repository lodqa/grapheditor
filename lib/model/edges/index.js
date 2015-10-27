import toArray from '../toArray'
import has from './has'
import toEdgeId from './toEdgeId'

export default function() {
  let edgeMap = new Map()

  return {
    name: 'Edge Map',
    add: (edge) => add(edgeMap, edge),
    has: (edge) => has(edgeMap, edge),
    toArray: () => toArray(edgeMap),
    arms: (nodeId) => arms(edgeMap, nodeId),
    getDuplicateFlag: (edge) => getDuplicateFlag(edgeMap, edge),
    setDuplicateFlag: (edge, value) => setDuplicateFlag(edgeMap, edge, value),
    del: (edge) => del(edgeMap, edge),
    setText: (edge) => setText(edgeMap, edge.id, edge.text)
  }
}

function add(edgeMap, edge) {
  let id = toEdgeId(edge),
    value = {
      id,
      sourceId: edge.sourceId,
      targetId: edge.targetId,
      text: edge.text
    }

  edgeMap.set(id, value)
}

function arms(edgeMap, nodeId) {
  let ret = []

  edgeMap.forEach((edge) => {
    if (edge.sourceId === nodeId) {
      ret.push(edge)
    }

    if (edge.targetId === nodeId) {
      ret.push(edge)
    }
  })

  return ret
}

function getDuplicateFlag(edgeMap, edge) {
  return edgeMap.get(toEdgeId(edge)).flag
}

function setDuplicateFlag(edgeMap, edge, value) {
  let id = toEdgeId(edge),
    newValue = Object.assign({},
      edgeMap.get(id), {
        flag: value
      })

  edgeMap.set(id, newValue)
}

function del(edgeMap, edge) {
  edgeMap.delete(toEdgeId(edge))
}

function setText(edgeMap, id, text) {
  console.assert(id, 'id is required to setText a edge.')

  // There is no node to update.
  if (!edgeMap.has(id)) {
    return false
  }
  let edge = edgeMap.get(id)

  if (edge.text !== text) {
    edge.text = text
    edgeMap.set(id, edge)
    return true
  }

  return false
}
