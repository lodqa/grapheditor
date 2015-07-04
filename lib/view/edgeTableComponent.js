import Handlebars from 'handlebars'
import extend from 'xtend'
import transform from './transform'

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
    <tr data-sourc-id="{{sourceId}}" data-target-id="{{targetId}}" class="{{#if selected}}selected{{/if}} {{#if hover}}hover{{/if}}">
      <td>{{label}}</td>
      <td>{{url}}</td>
    </tr>
    {{/edges}}
</tbody>

</table>`

let template = Handlebars.compile(TEMPLATE)

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
    select: (sourceId, targetId) => {
      edgesCache = select(unselect(edgesCache), sourceId, targetId)
      updateDisplay(component, edgesCache)
    },
    unselect: () => {
      edgesCache = unselect(edgesCache)
      updateDisplay(component, edgesCache)
    },
    hover: (sourceId, targetId) => {
      edgesCache = hover(edgesCache, sourceId, targetId)
      updateDisplay(component, edgesCache)
    },
    unhover: (sourceId, targetId) => {
      edgesCache = unhover(edgesCache, sourceId, targetId)
      updateDisplay(component, edgesCache)
    }
  }
}

function select(edges, sourceId, targetId) {
  return transform(edges, (e) => e.sourceId === sourceId && e.targetId === targetId, {
    selected: true
  })
}

function unselect(edges) {
  return transform(edges, () => true, {
    selected: false
  })
}

function hover(edges, sourceId, targetId) {
  return transform(edges, (e) => e.sourceId === sourceId && e.targetId === targetId, {
    hover: true
  })
}

function unhover(edges, sourceId, targetId) {
  return transform(edges, (e) => e.sourceId === sourceId && e.targetId === targetId, {
    hover: false
  })
}

function updateDisplay(component, edges) {
  edges.sort((a, b) => {
    if (a.id > b.id)
      return 1

    if (b.id > a.id)
      return -1

    return 0
  })

  component.innerHTML = template({
    edges: edges
  })
}
