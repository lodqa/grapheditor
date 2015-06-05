import extend from 'xtend'
import toArray from '../toArray'
import verify from './verify'
import toEdgeId from './toEdgeId'

export default function() {
  let edges = new Map()

  return {
    name: 'Edge Map',
    verify: (nodes, action) => verify(edges, nodes, action),
    add: (nodes, action) => add(edges, nodes, action),
    get: (id) => edges.get(id),
    getId: (nodes, action) => getId(edges, nodes, action),
    set: (nodes, action) => update(edges, nodes, action),
    taArray: () => toArray(edges)
  }
}

function getId(edges, nodes, action) {
  let id = toEdgeId(nodes, action)

  if (edges.get(id))
    return toEdgeId(nodes, action)
}

function add(edges, nodes, action) {
  let id = toEdgeId(nodes, action),
    value = {
      id: id,
      label: action.label,
      url: action.url,
      sourceId: action.sourceId,
      targetId: action.targetId
    }
  edges.set(id, value)

}

function update(edges, nodes, action) {
  console.assert(action.id, 'id is required to update a edge.')

  let value = extend(edges.get(action.id), {
    label: action.label,
    url: action.url
  })
  edges.set(action.id, value)
}
