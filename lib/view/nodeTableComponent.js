import Handlebars from 'handlebars'

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
    <tr data-id="{{id}}">
      <td {{#if selected}}class="selected"{{/if}}>{{label}}</td>
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
    select: (id) => select(component, nodesCache, id),
    unselect:(id) => updateDisplay(component, nodesCache)
  }
}

function select(component, nodes, id) {
  updateDisplay(component, nodes
    .map(n => {
      if (n.id === id)
        n.selected = true

      return n
    }))
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
