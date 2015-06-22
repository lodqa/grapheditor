import toEdgeId from './toEdgeId'

export default function(edges, nodes, action) {
  return edges.has(toEdgeId(action))
}
