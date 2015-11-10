import toArray from './toArray'

// Model class is base of models.
// It has key-values of text. The key is text and value is terms.
// The terms is array of value and enable.
// The value is string like url and else.
// The enable is in the mappings or not and according to the checkbox in the table.
export default class {
  constructor() {
    this._map = new Map()
  }
  add(value) {
    value.terms = []
    this._map.set(value.id, value)
  }
  getText(id) {
    return this._map.get(id).text
  }
  get texts() {
    // Return texts of all elements to find term of all
    return getTexts(this._map)
  }
  get snapshot() {
    return toArray(this._map)
  }
  setText(action) {
    return setText(this._map, action.id, action.text)
  }
  setTerm(action) {
    return setTerm(this._map, action.id, action.terms)
  }
  setMappings(mappings) {
    setMappings(this._map, mappings)
  }
  setLabel(url, label) {
    findAndSetLabel(this._map, url, label)
  }
  del(id) {
    this._map.delete(id)
  }
}

function getTexts(map) {
  return Array.from(map.values())
    .filter((n) => Boolean(n.text))
    .map((n) => n.text)
}

function setText(map, id, text) {
  console.assert(id, 'id is required to setText.')

  // There is no value to update.
  if (!map.has(id)) {
    return false
  }
  let value = map.get(id)

  if (value.text !== text) {
    value.text = text
    map.set(id, value)
    return true
  }

  return false
}

function setTerm(map, id, terms) {
  console.assert(id, 'id is required to setTerm a node.')
  console.assert(terms, 'terms is required to setTerm node')

  let value = map.get(id)

  if (hasTermChange(terms, value.terms)) {
    value.terms = terms
    map.set(id, value)
    return true
  }

  return false
}

function hasTermChange(newTerms, currentTerms) {
  return newTerms.length !== currentTerms.length || newTerms.reduce((result, t, index) => {
    let c = currentTerms[index]

    if (t.enable !== c.enable || t.value !== c.value) {
      return true
    }
    return result
  }, false)
}

function setMappings(map, mappings) {
  console.assert(mappings, 'mappings is required to setMappings')

  for (let elem of map.values()) {
    if (mappings[elem.text]) {
      elem.terms = mappings[elem.text].map((url) => {
        return {
          url,
          enable: true
        }
      })
    }
  }
}

function findAndSetLabel(map, url, label) {
  for (let elem of map.values()) {
    setLabel(elem, url, label)
  }
}

function setLabel(element, url, label) {
  element.terms
    .filter((term) => term.url === url)
    .forEach((term) => term.label = label)
}
