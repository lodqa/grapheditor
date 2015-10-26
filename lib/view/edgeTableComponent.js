import Ractive from 'ractive'
import transform from './transform'

const TEMPLATE = `
{{#if texts}}
<table>
  <tbody>
    {{#texts}}
    <tr class="{{#if selected}}selected{{/if}} {{#if hover}}hover{{/if}}">
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
    {{/texts}}
  </tbody>
</table>
{{/if}}`

// To be singleton.
let ractive

export default function(selector) {
  let component = document.querySelector(selector),
    cache = []

  if (!component) {
    throw new Error(`No dom is find by selector: '${selector}'`)
  }

  if (!ractive) {
    ractive = new Ractive({
      el: component,
      template: TEMPLATE,
      data: {
        texts: []
      }
    })
  }

  return {
    set: (texts) => {
      updateDisplay(ractive, component, texts)
      cache = texts
    },
    select: (sourceId, targetId) => {
      cache = select(unselect(cache), sourceId, targetId)
      updateDisplay(ractive, component, cache)
    },
    unselect: () => {
      cache = unselect(cache)
      updateDisplay(ractive, component, cache)
    },
    hover: (sourceId, targetId) => {
      cache = hover(cache, sourceId, targetId)
      updateDisplay(ractive, component, cache)
    },
    unhover: (sourceId, targetId) => {
      cache = unhover(cache, sourceId, targetId)
      updateDisplay(ractive, component, cache)
    }
  }
}

function select(texts, sourceId, targetId) {
  return transform(texts, (e) => e.sourceId === sourceId && e.targetId === targetId, {
    selected: true
  })
}

function unselect(texts) {
  return transform(texts, () => true, {
    selected: false
  })
}

function hover(texts, sourceId, targetId) {
  return transform(texts, (e) => e.sourceId === sourceId && e.targetId === targetId, {
    hover: true
  })
}

function unhover(texts, sourceId, targetId) {
  return transform(texts, (e) => e.sourceId === sourceId && e.targetId === targetId, {
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

  ractive.set('texts', data)
}
