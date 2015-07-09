import transform from './transform'
import Ractive from 'ractive'

const TEMPLATE = `
<table>
  <caption>Nodes.</caption>
  <thead>
    <tr>
      <th class="label">label</th>
      <th class="url">term</th>
    </tr>
  </thead>
  <tbody>
    {{#nodes}}
    <tr data-id="{{id}}" class="{{#if selected}}selected{{/if}} {{#if hover}}hover{{/if}}">
      <td class="label">
        <input value="{{label}}"><button class="lookup-button">lookup</button><button class="delete-button">x</button>
      </td>
      <td class="term">
          {{#url}}
          <div>
            <input type="checkbox" checked> <input class="term" value="{{.}}"> <button class="delete-button">x</button>
          </div>
          {{/url}}
          {{#if url}}
          <input class="term"><button class="add-button">+</button>
          {{/if}}
      </td>
    </tr>
    {{/nodes}}
</tbody>

</table>`

// To be singleton.
let ractive

export default function(selector) {
  let component = document.querySelector(selector),
    nodesCache = []

  if (!component)
    throw new Error(`No dom is find by selector: '${selector}'`);

  if (!ractive)
    ractive = new Ractive({
      el: component,
      template: TEMPLATE,
      data: {
        nodes: []
      }
    })

  return {
    set: (nodes) => {
      updateDisplay(ractive, nodes)
      nodesCache = nodes
    },
    select: (id) => {
      nodesCache = select(unselect(nodesCache), id)
      updateDisplay(ractive, nodesCache)
    },
    unselect: () => {
      nodesCache = unselect(nodesCache)
      updateDisplay(ractive, nodesCache)
    },
    hover: (id) => {
      nodesCache = hover(nodesCache, id)
      updateDisplay(ractive, nodesCache)
    },
    unhover: (id) => {
      nodesCache = unhover(nodesCache, id)
      updateDisplay(ractive, nodesCache)
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

function updateDisplay(ractive, nodes) {
  nodes.sort((a, b) => {
    if (a.id > b.id)
      return 1

    if (b.id > a.id)
      return -1

    return 0
  })

  ractive.set('nodes', nodes)
}
