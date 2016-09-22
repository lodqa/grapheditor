import Ractive from 'ractive'
import transformNode from './transformNode'
import getTr from '../getTr'
import NodeSnapshot from '../../../model/NodeSnapshot'
import TEMPLATE from './template'
import hoverTerm from '../hoverTerm'
import unhoverTerm from '../unhoverTerm'
import switchStateSearching from '../switchStateSearching'

// To be singleton.
let ractive

export default function(selector) {
  let component = document.querySelector(selector),
    cache = new NodeSnapshot()

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

      return ''
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
      updateDisplay(ractive, component, texts)
      unhoverTerm(ractive)
      cache = texts
    },
    select(id) {
      cache = select(unselect(cache), id)
      updateDisplay(ractive, component, cache)
    },
    unselect() {
      cache = unselect(cache)
      updateDisplay(ractive, component, cache)
    },
    hover(id) {
      cache = hover(cache, id)
      updateDisplay(ractive, component, cache)
    },
    unhover(id) {
      cache = unhover(cache, id)
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

function select(texts, id) {
  return transformNode(texts, (n) => n.id === id, {
    selected: true
  })
}

function unselect(texts) {
  return transformNode(texts, () => true, {
    selected: false
  })
}

function hover(texts, id) {
  return transformNode(texts, (n) => n.id === id, {
    hover: true
  })
}

function unhover(texts, id) {
  return transformNode(texts, (n) => n.id === id, {
    hover: false
  })
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

  ractive.set('texts', data.list)

  // Update radio button directly. Because an appearance is not update by rewrite html attributes.
  if (data.focus) {
    component.querySelector(`[data-id='${data.focus}'] .focus input`).checked = true
  } else {
    Array.from(component.querySelectorAll('.focus input'))
      .forEach((el) => el.checked = false)
  }
}
