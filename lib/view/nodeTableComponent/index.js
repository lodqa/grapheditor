import Ractive from 'ractive'
import transform from './transform'
import NodeData from '../../model/NodeData'

const TEMPLATE = `
{{#if nodes}}
<table>
  <thead>
    <tr>
      <th class="focus">
        <span title="focus">f</span>
      </th>
      <th class="label">
        <span class="title">text</span>
        <button class="lookup-all-button" title="lookup all nodes"><i class="fa fa-search"></i></button>
        <button class="delete-all-button" title="delete all nodes"><i class="fa fa-trash-o"></i></button>
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
      <td class="url">
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
    nodesCache = new NodeData()

  if (!component) {
    throw new Error(`No dom is find by selector: '${selector}'`)
  }

  if (!ractive) {
    ractive = new Ractive({
      el: component,
      template: TEMPLATE,
      data: {
        nodes: []
      }
    })
  }

  return {
    component,
    ractive,
    getNodeId: (element) => {
      let nodeElement = getNode(element)

      if (nodeElement) {
        return nodeElement.getAttribute('data-id')
      }

      return ''
    },
    getNodeIndex: (element) => {
      let nodeElement = getNode(element)

      if (nodeElement) {
        return parseInt(nodeElement.getAttribute('data-index'))
      }

      return null
    },
    getNodeValue: (index) => {
      console.assert(ractive.get(`nodes.${index}`), 'The node is not in tabel. index :', index, ractive.get('nodes'))
      return Object.assign({}, ractive.get(`nodes.${index}`))
    },
    getTermIndex: (element) => {
      let termElement = element.closest('.term')

      if (termElement) {
        return parseInt(termElement.getAttribute('data-index'))
      }

      return null
    },
    has: (index) => ractive.get(`nodes.${index}`),
    set: (nodes) => {
      updateDisplay(ractive, component, nodes)
      unhoverTerm(ractive)
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
    unhoverTerm: () => {
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
    index
  })
}

function unhoverTerm(ractive) {
  ractive.set('hover_term', {})
}

function updateDisplay(ractive, component, data) {
  data.list.sort((a, b) => {
    if (a.id > b.id) {
      return 1
    }

    if (b.id > a.id) {
      return -1
    }

    return 0
  })

  ractive.set('nodes', data.list)

  // Update radio button directly. Because an appearance is not update by rewrite html attributes.
  if (data.focus) {
    component.querySelector(`[data-id='${data.focus}'] .focus input`).checked = true
  } else {
    Array.from(component.querySelectorAll('.focus input'))
      .forEach((el) => el.checked = false)
  }

  if (data.list.length === 0) {
    component.previousElementSibling.classList.remove('hidden')
  } else {
    component.previousElementSibling.classList.add('hidden')
  }
}

function getNode(element) {
  return element.closest('.node')
}
