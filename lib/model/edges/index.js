import toArray from '../toArray'
import has from './has'
import toEdgeId from './toEdgeId'

export default function() {
  let edgeMap = new Map()

  return {
    name: 'Edge Map',
    has: (action) => has(edgeMap, action),
    add: (action) => add(edgeMap, action),
    del: (action) => del(edgeMap, action),
    get: (id) => edgeMap.get(id),
    getId: (action) => getId(edgeMap, action),
    toArray: () => toArray(edgeMap),
    arms: (nodeId) => arms(edgeMap, nodeId),
    getDuplicateFlag: (action) => getDuplicateFlag(edgeMap, action),
    setDuplicateFlag: (action, value) => setDuplicateFlag(edgeMap, action, value)
  }
}

function arms(edgeMap, nodeId) {
  let ret = []
  edgeMap.forEach((edge) => {
    if (edge.sourceId === nodeId)
      ret.push(edge)

    if (edge.targetId === nodeId)
      ret.push(edge)
  })

  return ret
}

function getId(edgeMap, action) {
  let id = toEdgeId(action)

  if (edgeMap.get(id))
    return toEdgeId(action)
}

function add(edgeMap, action) {
  let id = toEdgeId(action),
    value = {
      id: id,
      sourceId: action.sourceId,
      targetId: action.targetId,
      label: action.label
    }

  edgeMap.set(id, value)
}

function del(edgeMap, action) {
  edgeMap.delete(toEdgeId(action))
}

function getDuplicateFlag(edgeMap, action) {
  return edgeMap.get(toEdgeId(action)).flag
}

function setDuplicateFlag(edgeMap, action, value) {
  let id = toEdgeId(action),
    newValue = Object.assign({},
      edgeMap.get(id), {
        flag: value
      })

  edgeMap.set(id, newValue)
}
