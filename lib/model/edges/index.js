import extend from 'xtend'
import toArray from '../toArray'
import verify from './verify'
import has from './has'
import toEdgeId from './toEdgeId'

export default function() {
  let edgeMap = new Map()

  return {
    name: 'Edge Map',
    verify: (action) => verify(edgeMap, action),
    has: (action) => has(edgeMap, action),
    add: (action) => add(edgeMap, action),
    del: (id) => del(edgeMap, id),
    get: (id) => edgeMap.get(id),
    getId: (action) => getId(edgeMap, action),
    set: (action) => update(edgeMap, action),
    taArray: () => toArray(edgeMap),
    arms: (nodeId) => arms(edgeMap, nodeId)
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
      label: action.label,
      url: action.url,
      sourceId: action.sourceId,
      targetId: action.targetId
    }
  edgeMap.set(id, value)

}

function del(edgeMap, id) {
   let edge = edgeMap.get(id)
   edgeMap.delete(id)
   return [edge.sourceId, edge.targetId]
}

function update(edgeMap, action) {
  console.assert(action.id, 'id is required to update a edge.')

  let value = extend(edgeMap.get(action.id), {
    label: action.label,
    url: action.url
  })
  edgeMap.set(action.id, value)
}
