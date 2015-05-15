export default function() {
  let edges = new Map()

  return {
    add: (nodes, action) => addEdge(edges, nodes, action)
  }
}

function addEdge(edges, nodes, action) {
  let sourceURL = nodes.get(action.sourceId),
    targetURL = nodes.get(action.targetId)

  edges.set(`${sourceURL}|${targetURL}`, {
    label: action.label,
    url: ''
  })
}
