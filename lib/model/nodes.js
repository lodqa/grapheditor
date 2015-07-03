import uuid from 'uuid'
import toArray from './toArray'

export default function() {
  let nodeMap = new Map()

  return {
    name: 'Nade Map',
    add: (action) => add(nodeMap, action),
    get: (id) => get(nodeMap, id),
    getLabels: () => getLabels(nodeMap),
    del: (id) => del(nodeMap, id),
    set: (action) => update(nodeMap, action),
    setUrl: (mappings) => setUrl(nodeMap, mappings),
    verify: (action) => verify(nodeMap, action),
    taArray: () => toArray(nodeMap)
  }
}

function add(nodeMap, action) {
  let id = action.id || `node-${uuid.v1()}`

  nodeMap.set(id, {
    id: id,
    label: action.label
  })

  return id;
}

function get(nodeMap, id) {
  return Object.assign({}, nodeMap.get(id))
}

function getLabels(nodeMap) {
  return Array.from(nodeMap.values())
    .map(n => n.label)
}

function del(nodeMap, id) {
  nodeMap.delete(id)
}

function update(nodeMap, action) {
  console.assert(action.id, 'id is required to update a node.')

  let old = get(nodeMap, action.id)
  nodeMap.set(action.id, Object.assign({}, old, action))
}

function setUrl(nodeMap, mappings) {
  for (let node of nodeMap.values()) {
    node.url = mappings[node.label]
  }
}

function verify(nodeMap, action) {
  if (!action.label)
    return {
      isValid: false,
      reason: 'no label.'
    }

  return {
    isValid: true
  }
}
