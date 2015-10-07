import Ractive from 'ractive'

const TEMPLATE = `
{{#if edges}}
<table>
  <tbody>
    {{#edges}}
    <tr>
      <td class="text">
        <input value="{{id}}">
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
  let component = document.querySelector(selector)

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
    }
  }
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
