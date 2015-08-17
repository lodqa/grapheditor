import transform from './transform'
import Ractive from 'ractive'

const TEMPLATE = `
{{#if nodes}}
<table>
  <thead>
    <tr>
      <th>focus</th>
      <th class="label">
        <span class="title">nodes</span>
        <button class="lookup-all-button" title="lookup all node"><i class="fa fa-search"></i></button>
        <button class="delete-all-button" title="delete all node"><i class="fa fa-trash-o"></i></button>
      </th>
      <th class="url">term</th>
    </tr>
  </thead>
  <tbody>
    {{#nodes}}
    <tr data-id="{{id}}" data-index={{@index}} class="node {{#if selected}}selected{{/if}} {{#if hover}}hover{{/if}}">
      <td class="focus">
        <input type="radio" name="focus" value="{{id}}">
      </td>
      <td class="label">
        <input value="{{label}}">
        <button class="lookup-button" title="lookup"><i class="fa fa-search"></i></button>
        <button class="delete-button" title="delete"><i class="fa fa-trash-o"></i></button>
      </td>
      <td class="term">
          {{#terms}}
          <div data-index={{@index}} class="term {{#if id==hover_term.node && @index==hover_term.index}}hover{{/if}}">
            <input type="checkbox" checked="{{enable}}">
            <input class="term" value="{{value}}">
            <button class="delete-button" title="delete"><i class="fa fa-trash-o"></i></button>
          </div>
          {{/terms}}
          <div class="add">
            <input type="checkbox">
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
    getNodeId: (element) => {
      let nodeElement = getNode(element)

      return nodeElement ? nodeElement.getAttribute('data-id') : ''
    },
    getNodeIndex: (element) => {
      let nodeElement = getNode(element)

      return nodeElement ? nodeElement.getAttribute('data-index') : ''
    },
    getNodeValue: (index) => {
      console.assert(ractive.get(`nodes.${index}`), 'The node is not in tabel. index :', index, ractive.get('nodes'))
      return Object.assign({}, ractive.get(`nodes.${index}`))
    },
    getTermIndex: (element) => {
      let termElement = element.closest('.term')

      return termElement ? termElement.getAttribute('data-index') : ''
    },
    has: (index) => ractive.get(`nodes.${index}`) !== undefined,
    set: (nodes) => {
      updateDisplay(ractive, component, nodes)
      nodesCache = nodes
    },
    select: (id) => {
      nodesCache = select(unselect(nodesCache), id)
      updateDisplay(ractive, component, nodesCache)
    },
    unselect: () => {
      nodesCache = unselect(nodesCache)
      updateDisplay(ractive, component, nodesCache)
    },
    hover: (id) => {
      nodesCache = hover(nodesCache, id)
      updateDisplay(ractive, component, nodesCache)
    },
    unhover: (id) => {
      nodesCache = unhover(nodesCache, id)
      updateDisplay(ractive, component, nodesCache)
    },
    hoverTerm: (id, index) => {
      hoverTerm(ractive, id, index)
    },
    unhoverTerm: (id, index) => {
      unhoverTerm(ractive)
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

function hoverTerm(ractive, id, index) {
  ractive.set('hover_term', {
    node: id,
    index: index
  })
}

function unhoverTerm(ractive, id, index) {
  ractive.set('hover_term', {})
}

function updateDisplay(ractive, component, data) {
  data.list.sort((a, b) => {
    if (a.id > b.id)
      return 1

    if (b.id > a.id)
      return -1

    return 0
  })

  ractive.set('nodes', data.list)

  // Update radio button directly. Because an appearance is not update by rewrite html attributes.
  if (data.focus) {
    component.querySelector(`[data-id='${data.focus}'] .focus input`).checked = true
  } else {
    Array.from(component.querySelectorAll('.focus input'))
      .forEach(el => el.checked = false)
  }
}

function getNode(element) {
  return element.closest('.node')
}
