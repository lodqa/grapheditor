import Handlebars from 'handlebars'
import transform from './transform'

const NODE_TEMPLATE = `
  nodes:{<br>
    {{#nodes}}
      {{id}}: { text: {{label}} },<br>
    {{/nodes}}
  }
`

const EDGE_TEMPLATE = `
  edges:[<br>
    {{#edges}} {
      object: {{targetId}}<br>
      subject: {{sourceId}}<br>
      text: {{label}}
    },<br>
    {{/edges}}
  ]
`

let node_template = Handlebars.compile(NODE_TEMPLATE)
let edge_template = Handlebars.compile(EDGE_TEMPLATE)

export default function(selector) {
  let component = document.querySelector(selector)

  if (!component)
    throw new Error(`No dom is find by selector: '${selector}'`);

  return {
    setNode: (nodes) => setNode(component, nodes),
    setEdge: (edges) => setEdge(component, edges)
  } 
}

function setNode(component, nodes){
  component.children[0].innerHTML = node_template({
    nodes: nodes
  })
}

function setEdge(component, edges){
  component.children[1].innerHTML = edge_template({
    edges: edges
  })
}