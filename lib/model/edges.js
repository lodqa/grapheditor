export default function() {
  let edges = new Map()

  return {
    verify: (nodes, action) => verifyEdge(edges, nodes, action),
    add: (nodes, action) => setEdge(edges, nodes, action),
    set: (nodes, action) => setEdge(edges, nodes, action)
  }
}

function verifyEdge(edges, nodes, action) {
  return !edges.has(toEdgeId(nodes, action))
}

function setEdge(edges, nodes, action) {
  let value = {
    label: action.label,
    url: action.url
  }
  edges.set(toEdgeId(nodes, action), value)
}

function toEdgeId(nodes, action) {
  let sourceURL = nodes.get(action.sourceId).url,
    targetURL = nodes.get(action.targetId).url

  return `${sourceURL}|${targetURL}`
}
