import Ractive from 'ractive'
import transform from './transform'
import getTr from './getTr'

const TEMPLATE = `
{{#if texts}}
<table>
  <tbody>
    {{#texts}}
    <tr data-id="{{id}}" data-source-id="{{sourceId}}" data-target-id="{{targetId}}" data-index={{@index}} class="{{#if selected}}selected{{/if}} {{#if hover}}hover{{/if}}">
      <td class="focus">
      </td>
      <td class="text">
        <input value="{{text}}">
        <button class="find-term-button" title="find term"><i class="fa fa-search"></i></button>
        <button class="delete-button" title="delete"><i class="fa fa-trash-o"></i></button>
      </td>
      <td class="terms">
          {{#terms}}
          <div data-index={{@index}} class="term {{#if id==hover_term.text && @index==hover_term.index}}hover{{/if}}">
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
    component,
    ractive,
    getTextId: (element) => {
      let trElement = getTr(element)

      if (trElement) {
        return trElement.getAttribute('data-id')
      }

      return null
    },
    getTextFullId: (element) => {
      let trElement = getTr(element)

      if (trElement) {
        return [
          trElement.getAttribute('data-id'),
          trElement.getAttribute('data-source-id'),
          trElement.getAttribute('data-target-id')
        ]
      }

      return []
    },
    getTextIndex: (element) => {
      let trElement = getTr(element)

      if (trElement) {
        return parseInt(trElement.getAttribute('data-index'))
      }

      return null
    },
    getTextValue: (index) => {
      console.assert(ractive.get(`texts.${index}`), 'The text is not in tabel. index :', index, ractive.get('texts'))
      return Object.assign({}, ractive.get(`texts.${index}`))
    },
    getTermIndex: (element) => {
      let termElement = element.closest('.term')

      if (termElement) {
        return parseInt(termElement.getAttribute('data-index'))
      }

      return null
    },
    has: (index) => ractive.get(`texts.${index}`),
    set: (texts) => {
      let fixedTexts = texts.map((t) => {
        let text = t.text

        if (!t.text) {
          text = '*'
        }

        return Object.assign({}, t, {
          text
        })
      })

      updateDisplay(ractive, component, fixedTexts)
      unhoverTerm(ractive)
      cache = fixedTexts
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
    },
    hoverTerm: (id, index) => {
      hoverTerm(ractive, id, index)
    },
    unhoverTerm: () => {
      unhoverTerm(ractive)
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

function hoverTerm(ractive, id, index) {
  ractive.set('hover_term', {
    text: id,
    index
  })
}

function unhoverTerm(ractive) {
  ractive.set('hover_term', {})
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
