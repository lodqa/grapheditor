import uuid from 'uuid'
import toArray from './toArray'
import NodeData from './NodeData'

export default function() {
  let nodeMap = new Map(),
    focus

  return {
    name: 'Nade Map',
    add: (action) => add(nodeMap, action),
    getText: (id) => nodeMap.get(id).text,
    getTexts: () => getTexts(nodeMap),
    get snapshot() {
      return new NodeData(focusMustBeInMap(nodeMap, focus), toArray(nodeMap))
    },
    del: (id) => del(nodeMap, id),
    set focus(id) {
      focus = id
    },
    setText: (action) => setText(nodeMap, action.id, action.text),
    setTerm: (action) => setTerm(nodeMap, action.id, action.terms),
    setMappings: (mappings) => setMappings(nodeMap, mappings),
    verify: (action) => verify(nodeMap, action)
  }
}

function add(nodeMap, action) {
  let id = action.id || `node-${uuid.v1()}`

  nodeMap.set(id, {
    id,
    text: action.text,
    terms: []
  })

  return id
}

function getTexts(nodeMap) {
  return Array.from(nodeMap.values())
    .map((n) => n.text)
}

function focusMustBeInMap(nodeMap, focus) {
  if (nodeMap.get(focus)) {
    return focus
  }
}

function del(nodeMap, id) {
  nodeMap.delete(id)
}

function setText(nodeMap, id, text) {
  console.assert(id, 'id is required to setText a node.')

  // There is no node to update.
  if (!nodeMap.has(id)) {
    return false
  }
  let node = nodeMap.get(id)

  if (node.text !== text) {
    node.text = text
    nodeMap.set(id, node)
    return true
  }

  return false
}

function setTerm(nodeMap, id, terms) {
  console.assert(id, 'id is required to setTerm a node.')
  console.assert(terms, 'terms is required to setTerm node')

  let node = nodeMap.get(id)

  if (hasTermChange(terms, node.terms)) {
    node.terms = terms
    nodeMap.set(id, node)
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

function setMappings(nodeMap, mappings) {
  console.assert(mappings, 'mappings is required to setMappings')

  for (let [text, terms] of Object.entries(mappings)) {
    for (let node of nodeMap.values()) {
      if (node.text === text) {
        node.terms = terms.map((term) => {
          return {
            value: term,
            enable: true
          }
        })
      }
    }
  }
}

function verify(nodeMap, action) {
  if (!action.text) {
    return {
      isValid: false,
      reason: 'no text.'
    }
  }

  return {
    isValid: true
  }
}
