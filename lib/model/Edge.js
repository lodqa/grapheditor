import Model from './Model'

// Edge has no duplicate edge.
export default class extends Model {
  constructor() {
    super()
  }

  // The id in Edge is that combined sourceId and targetId.
  add(edge) {
    const value = {
      id: toEdgeId(edge),
      sourceId: edge.sourceId,
      targetId: edge.targetId,
      text: edge.text
    }

    super.add(value)
  }
  has(edge) {
    return this._map.has(toEdgeId(edge))
  }
  arms(nodeId) {
    return arms(this._map, nodeId)
  }
  getDuplicateFlag(edge) {
    return getDuplicateFlag(this._map, edge)
  }
  setDuplicateFlag(edge, value) {
    setDuplicateFlag(this._map, edge, value)
  }
  del(edge) {
    super.del(toEdgeId(edge))
  }
}

function arms(edgeMap, nodeId) {
  const ret = []

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
  const id = toEdgeId(edge)
  const newValue = Object.assign({},
      edgeMap.get(id), {
        flag: value
      })

  edgeMap.set(id, newValue)
}

function toEdgeId(action) {
  return `edge:${action.sourceId}:${action.targetId}`
}
