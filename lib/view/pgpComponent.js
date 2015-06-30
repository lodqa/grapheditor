let pgp = {}

export default function(selector) {
  let component = document.querySelector(selector)

  if (!component)
    throw new Error(`No dom is find by selector: '${selector}'`);

  return {
    setNode: (nodes) => setNode(component, nodes),
    setEdge: (edges) => setEdge(component, edges)
  }
}

function setNode(component, nodes) {
  pgp.nodes = nodes.reduce((ret, node) => {
    ret[node.id] = {
      text: node.label
    }
    return ret
  }, {})

  component.innerHTML = JSON.stringify(pgp)
}

function setEdge(component, edges) {
  pgp.edges = edges.map(e => {
    return {
      object: e.targetId,
      subject: e.sourceId,
      text: e.label
    }
  })

  component.innerHTML = JSON.stringify(pgp)
}
