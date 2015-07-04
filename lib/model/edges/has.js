import toEdgeId from './toEdgeId'

export default function(edges, action) {
  return edges.has(toEdgeId(action))
}
