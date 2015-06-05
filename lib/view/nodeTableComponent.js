import Handlebars from 'handlebars'
import transform from './transform'

const TEMPLATE = `
<table>
  <caption>Nodes.</caption>
  <thead>
    <tr>
      <th class="label">label</th>
      <th class="url">url</th>
    </tr>
  </thead>
  <tbody>
    {{#nodes}}
    <tr data-id="{{id}}" class="{{#if selected}}selected{{/if}} {{#if hover}}hover{{/if}}">
      <td>{{label}}</td>
      <td>{{url}}</td>
    </tr>
    {{/nodes}}
</tbody>

</table>`

let tepmlate = Handlebars.compile(TEMPLATE)

export default function(selector) {
  let component = document.querySelector(selector),
    nodesCache = []

  if (!component)
    throw new Error(`No dom is find by selector: '${selector}'`);

  return {
    set: (nodes) => {
      updateDisplay(component, nodes)
      nodesCache = nodes
    },
    select: (id) => {
      nodesCache = select(unselect(nodesCache), id)
      updateDisplay(component, nodesCache)
    },
    unselect: () => {
      nodesCache = unselect(nodesCache)
      updateDisplay(component, nodesCache)
    },
    hover: (id) => {
      nodesCache = hover(nodesCache, id)
      updateDisplay(component, nodesCache)
    },
    unhover: (id) => {
      nodesCache = unhover(nodesCache, id)
      updateDisplay(component, nodesCache)
    }
  }
}


function select(nodes, id) {
  return transform(nodes, (n) => n.id === id, {
    selected: true
  })
}

function unselect(nodes) {
  return transform(nodes, () => true, {
    selected: false
  })
}

function hover(nodes, id) {
  return transform(nodes, (n) => n.id === id, {
    hover: true
  })
}

function unhover(nodes, id) {
  return transform(nodes, (n) => n.id === id, {
    hover: false
  })
}

function updateDisplay(component, nodes) {
  nodes.sort((a, b) => {
    if (a.id > b.id)
      return 1

    if (b.id > a.id)
      return -1

    return 0
  })

  component.innerHTML = tepmlate({
    nodes: nodes
  })
}
