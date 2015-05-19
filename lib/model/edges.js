export default function() {
  let edges = new Map()

  return {
    verify: (nodes, action) => verifyEdge(edges, nodes, action),
    add: (nodes, action) => addEdge(edges, nodes, action)
  }
}

function verifyEdge(edges, nodes, action) {
  return !edges.has(toEdgeId(nodes, action))
}

function addEdge(edges, nodes, action) {
  edges.set(toEdgeId(nodes, action), {
    label: action.label.label,
    url: ''
  })
}

function toEdgeId(nodes, action) {
  let sourceURL = nodes.get(action.sourceId).url,
    targetURL = nodes.get(action.targetId).url

  return `${sourceURL}|${targetURL}`
}
