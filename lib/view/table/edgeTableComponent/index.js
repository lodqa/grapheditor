import Ractive from 'ractive'
import transform from '../transform'
import getTr from '../getTr'
import TEMPLATE from './template'
import hoverTerm from '../hoverTerm'
import unhoverTerm from '../unhoverTerm'
import switchStateSearching from '../switchStateSearching'

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
      const trElement = getTr(element)

      if (trElement) {
        return trElement.getAttribute('data-id')
      }

      return null
    },
    getTextFullId(element) {
      const trElement = getTr(element)

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
      const trElement = getTr(element)

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
      const termElement = element.closest('.term')

      if (termElement) {
        return parseInt(termElement.getAttribute('data-index'))
      }

      return null
    },
    has(index) {
      return ractive.get(`texts.${index}`)
    },
    set(texts) {
      updateDisplay(ractive, component, texts)
      unhoverTerm(ractive)
      cache = texts
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
    switchStateSearching(searching) {
      switchStateSearching(component, searching)
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
