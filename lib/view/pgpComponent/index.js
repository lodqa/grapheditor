import Pgp from './pgp'

export default function(selector) {
  const pgp = new Pgp()
  const component = document.querySelector(selector)

  if (!component) {
    throw new Error(`No dom is find by selector: '${selector}'`)
  }

  return {
    setNode: (data) => setNode(component, pgp, data.list, data.focus),
    setEdge: (edges) => setEdge(component, pgp, edges)
  }
}

function setNode(component, pgp, nodes, focus) {
  pgp.nodes = nodes
  pgp.focus = focus
  updateDisplay(component, pgp.json)
}

function setEdge(component, pgp, edges) {
  pgp.edges = edges
  updateDisplay(component, pgp.json)
}

function updateDisplay(component, pgp) {
  component.innerHTML = JSON.stringify(pgp, null, 2)
}
