import toArray from '../toArray'
import has from './has'
import toEdgeId from './toEdgeId'

export default function() {
  let edgeMap = new Map()

  return {
    name: 'Edge Map',
    has: (edge) => has(edgeMap, edge),
    add: (edge) => add(edgeMap, edge),
    del: (edge) => del(edgeMap, edge),
    toArray: () => toArray(edgeMap),
    arms: (nodeId) => arms(edgeMap, nodeId),
    getDuplicateFlag: (edge) => getDuplicateFlag(edgeMap, edge),
    setDuplicateFlag: (edge, value) => setDuplicateFlag(edgeMap, edge, value)
  }
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

function add(edgeMap, edge) {
  let id = toEdgeId(edge),
    value = {
      id,
      sourceId: edge.sourceId,
      targetId: edge.targetId
    }

  edgeMap.set(id, value)
}

function del(edgeMap, edge) {
  edgeMap.delete(toEdgeId(edge))
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
