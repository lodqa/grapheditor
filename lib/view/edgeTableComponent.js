import Ractive from 'ractive'
import transform from './transform'

const TEMPLATE = `
{{#if edges}}
<table>
  <tbody>
    {{#edges}}
    <tr class="{{#if hover}}hover{{/if}}">
      <td class="text">
        <input value="{{#if text}}{{text}}{{else}}*{{/if}}">
        <button class="lookup-button" title="lookup"><i class="fa fa-search"></i></button>
        <button class="delete-button" title="delete"><i class="fa fa-trash-o"></i></button>
      </td>
      <td class="term">
        <div class="add">
          <input class="term">
          <button class="add-button" title="add"><i class="fa fa-plus"></i></button>
        </div>
      </td>
    </tr>
    {{/nodes}}
  </tbody>
</table>
{{/if}}`

// To be singleton.
let ractive

export default function(selector) {
  let component = document.querySelector(selector),
    edgesCache = []

  if (!component) {
    throw new Error(`No dom is find by selector: '${selector}'`)
  }

  if (!ractive) {
    ractive = new Ractive({
      el: component,
      template: TEMPLATE,
      data: {
        edges: []
      }
    })
  }

  return {
    set: (edges) => {
      updateDisplay(ractive, component, edges)
      edgesCache = edges
    },
    hover: (sourceId, targetId) => {
      edgesCache = hover(edgesCache, sourceId, targetId)
      updateDisplay(ractive, component, edgesCache)
    },
    unhover: (sourceId, targetId) => {
      edgesCache = unhover(edgesCache, sourceId, targetId)
      updateDisplay(ractive, component, edgesCache)
    }
  }
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

function updateDisplay(ractive, component, data) {
  data.sort((a, b) => {
    if (a.id > b.id) {
      return 1
    }

    if (b.id > a.id) {
      return -1
    }

    return 0
  })

  ractive.set('edges', data)
}
