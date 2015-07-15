import transform from './transform'
import Ractive from 'ractive'

const TEMPLATE = `
{{#if nodes}}
<table>
  <thead>
    <tr>
      <th class="label">
        nodes
        <button class="lookup-all-button" title="lookup all node"><i class="fa fa-search"></i></button>
      </th>
      <th class="url">term</th>
    </tr>
  </thead>
  <tbody>
    {{#nodes}}
    <tr data-id="{{id}}" data-index={{@index}} class="node {{#if selected}}selected{{/if}} {{#if hover}}hover{{/if}}">
      <td class="label">
        <input value="{{label}}">
        <button class="lookup-button" title="lookup"><i class="fa fa-search"></i></button>
        <button class="delete-button" title="delete"><i class="fa fa-trash-o"></i></button>
      </td>
      <td class="term">
          {{#terms}}
          <div>
            <input type="checkbox" checked="{{enable}}">
            <input class="term" value="{{value}}">
            <button class="delete-button" title="delete"><i class="fa fa-trash-o"></i></button>
          </div>
          {{/terms}}
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
    component: component,
    ractive: ractive,
    set: (nodes) => {
      updateDisplay(ractive, nodes)
      nodesCache = nodes
    },
    select: (id) => {
      nodesCache = select(unselect(nodesCache), id)
      updateDisplay(ractive, nodesCache)

      component.querySelector(`[data-id="${id}"] input`).focus()
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
