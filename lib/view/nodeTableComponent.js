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
      <td>{{label}}</td>
      <td>{{url}}</td>
    </tr>
    {{/nodes}}
</tbody>

</table>`

let tepmlate = Handlebars.compile(TEMPLATE)

export default function(selector) {
  let component = document.querySelector(selector)
  if (!component)
    throw new Error(`No dom is find by selector: '${selector}'`);

  return {
    set: (nodes) => {
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
  }
}
