let pgp = {}

export default function(selector) {
  let component = document.querySelector(selector)

  if (!component)
    throw new Error(`No dom is find by selector: '${selector}'`);

  return {
    setNode: (data) => setNode(component, data.list, data.focus),
    setEdge: (edges) => setEdge(component, edges)
  }
}

function setNode(component, nodes, focus) {
  pgp.nodes = nodes.reduce((ret, node) => {
    ret[node.id] = {
      text: node.label
    }
    return ret
  }, {})

  pgp.focus = focus

  update(component, pgp)
}

function setEdge(component, edges) {
  pgp.edges = edges.map(e => {
    return {
      object: e.targetId,
      subject: e.sourceId
    }
  })

  update(component, pgp)
}

function update(component, pgp) {
  component.innerHTML = JSON.stringify(pgp, null, 2)
}
