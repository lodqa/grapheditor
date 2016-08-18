import Ractive from 'ractive'
import transform from '../transform'
import getTr from '../getTr'
import TEMPLATE from './template'
import hoverTerm from '../hoverTerm'
import unhoverTerm from '../unhoverTerm'

// To be singleton.
let ractive

export default function(selector) {
  const component = document.querySelector(selector)
  let cache = []

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
    getTextId(element) {
      let trElement = getTr(element)

      if (trElement) {
        return trElement.getAttribute('data-id')
      }

      return null
    },
    getTextFullId(element) {
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
    getTextIndex(element) {
      let trElement = getTr(element)

      if (trElement) {
        return parseInt(trElement.getAttribute('data-index'))
      }

      return null
    },
    getTextValue(index) {
      console.assert(ractive.get(`texts.${index}`), 'The text is not in tabel. index :', index, ractive.get('texts'))
      return Object.assign({}, ractive.get(`texts.${index}`))
    },
    getTermIndex(element) {
      let termElement = element.closest('.term')

      if (termElement) {
        return parseInt(termElement.getAttribute('data-index'))
      }

      return null
    },
    has(index) {
      ractive.get(`texts.${index}`)
    },
    set(texts) {
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
    select(sourceId, targetId) {
      cache = select(unselect(cache), sourceId, targetId)
      updateDisplay(ractive, component, cache)
    },
    unselect() {
      cache = unselect(cache)
      updateDisplay(ractive, component, cache)
    },
    hover(sourceId, targetId) {
      cache = hover(cache, sourceId, targetId)
      updateDisplay(ractive, component, cache)
    },
    unhover(sourceId, targetId) {
      cache = unhover(cache, sourceId, targetId)
      updateDisplay(ractive, component, cache)
    },
    hoverTerm(id, index) {
      hoverTerm(ractive, id, index)
    },
    unhoverTerm() {
      unhoverTerm(ractive)
    },
    disabledFindTerm(disabled) {
      for (const el of component.querySelectorAll('.find-term')) {
        el.disabled = disabled
      }
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
