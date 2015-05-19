export default function() {
  let edges = new Map()

  return {
    add: (nodes, action) => addEdge(edges, nodes, action)
  }
}

function addEdge(edges, nodes, action) {
  let sourceURL = nodes.get(action.sourceId).url,
    targetURL = nodes.get(action.targetId).url

  edges.set(`${sourceURL}|${targetURL}`, {
    label: action.label.label,
    url: ''
  })

  console.log(edges)
}
