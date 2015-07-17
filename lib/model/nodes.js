import uuid from 'uuid'
import toArray from './toArray'

export default function() {
  let nodeMap = new Map()

  return {
    name: 'Nade Map',
    add: (action) => add(nodeMap, action),
    get: (id) => get(nodeMap, id),
    getLabels: () => getLabels(nodeMap),
    del: (id) => del(nodeMap, id),
    setLabel: (action) => setLabel(nodeMap, action.id, action.label),
    setTerm: (action) => setTerm(nodeMap, action.id, action.terms),
    setUrl: (mappings) => setUrl(nodeMap, mappings),
    verify: (action) => verify(nodeMap, action),
    toArray: () => toArray(nodeMap)
  }
}

function add(nodeMap, action) {
  let id = action.id || `node-${uuid.v1()}`

  nodeMap.set(id, {
    id: id,
    label: action.label,
    terms: []
  })

  return id;
}

function get(nodeMap, id) {
  return Object.assign({}, nodeMap.get(id))
}

function getLabels(nodeMap) {
  return Array.from(nodeMap.values())
    .map(n => n.label)
}

function del(nodeMap, id) {
  nodeMap.delete(id)
}

function setLabel(nodeMap, id, label) {
  console.assert(id, 'id is required to setLabel a node.')

  let node = get(nodeMap, id)

  if (node.label !== label) {
    node.label = label
    nodeMap.set(id, node)
    return true
  } else {
    return false
  }
}

function setTerm(nodeMap, id, terms) {
  console.assert(id, 'id is required to setTerm a node.')
  console.assert(terms, 'terms is required to setTerm node')

  let node = get(nodeMap, id)
  if (hasTermChange(terms, node.terms)) {
    node.terms = terms
    nodeMap.set(id, node)
    return true
  } else {
    return false
  }
}

function hasTermChange(newTerms, currentTerms) {
  return newTerms.length !== currentTerms.length || newTerms.reduce((result, t, index) => {
    let c = currentTerms[index]
    if (t.enable !== c.enable || t.value !== c.value)
      return true

    return result
  }, false)
}

function setUrl(nodeMap, mappings) {
  for (let [label, terms] of Object.entries(mappings)) {
    for (let node of nodeMap.values()) {
      if (node.label === label)
        node.terms = terms.map(term => {
          return {
            value: term,
            enable: true
          }
        })
    }
  }
}

function verify(nodeMap, action) {
  if (!action.label)
    return {
      isValid: false,
      reason: 'no label.'
    }

  return {
    isValid: true
  }
}
