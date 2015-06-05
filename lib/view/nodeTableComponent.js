import Handlebars from 'handlebars'
import extend from 'xtend'

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
      let nodes = hover(nodesCache, id)
      updateDisplay(component, nodes)
    },
    unhover: (id) => {
      let nodes = unhover(nodesCache, id)
      updateDisplay(component, nodes)
    }
  }
}

function select(nodes, id) {
  return nodes
    .map(n => {
      if (n.id === id)
        n = extend(n, {
          selected: true
        })

      return n
    })
}

function unselect(nodes) {
  return nodes
    .map(n => {
      n = extend(n, {
        selected: false
      })

      return n
    })
}

function hover(nodes, id) {
  return nodes
    .map(n => {
      if (n.id === id)
        n = extend(n, {
          hover: true
        })

      return n
    })
}

function unhover(nodes, id) {
  return nodes
    .map(n => {
      if (n.id === id)
        n = extend(n, {
          hover: false
        })

      return n
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
