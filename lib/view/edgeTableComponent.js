import Handlebars from 'handlebars'
import extend from 'xtend'

const TEMPLATE = `
<table>
  <caption>Edges.</caption>
  <thead>
    <tr>
      <th class="label">label</th>
      <th class="url">url</th>
    </tr>
  </thead>
  <tbody>
    {{#edges}}
    <tr data-sourc-id="{{sourceId}}" data-target-id="{{targetId}}">
      <td {{#if selected}}class="selected"{{/if}}>{{label}}</td>
      <td>{{url}}</td>
    </tr>
    {{/edges}}
</tbody>

</table>`

let tepmlate = Handlebars.compile(TEMPLATE)

export default function(selector) {
  let component = document.querySelector(selector),
    edgesCache = []

  if (!component)
    throw new Error(`No dom is find by selector: '${selector}'`);

  return {
    set: (edges) => {
      updateDisplay(component, edges)
      edgesCache = edges
    },
    select: (sourceId, targetId) => select(component, edgesCache, sourceId, targetId),
    unselect: () => updateDisplay(component, edgesCache)
  }
}

function select(component, edges, sourceId, targetId) {
  updateDisplay(component, edges
    .map(e => {
      if (e.sourceId === sourceId && e.targetId === targetId)
        e = extend(e, {
          selected: true
        })

      return e
    }))
}

function updateDisplay(component, edges) {
  edges.sort((a, b) => {
    if (a.id > b.id)
      return 1

    if (b.id > a.id)
      return -1

    return 0
  })

  component.innerHTML = tepmlate({
    edges: edges
  })
}
