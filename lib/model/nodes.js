import extend from 'xtend'
import uuid from 'uuid'
import toArray from './toArray'
import isUrl from './isUrl'

export default function() {
  let nodeMap = new Map()

  return {
    name: 'Nade Map',
    verify: (action) => verify(nodeMap, action),
    add: (action) => add(nodeMap, action),
    get: (id) => get(nodeMap, id),
    getId: (url) => getId(nodeMap, url),
    set: (action) => update(nodeMap, action),
    taArray: () => toArray(nodeMap)
  }
}

function verify(nodeMap, action) {
  if (action.id) {
    if (!action.label)
      return {
        isValid: false,
        reason: 'no label.'
      }

    if (!action.url)
      return {
        isValid: false,
        reason: 'no url.'
      }

    if (!isUrl(action.url))
      return {
        isValid: false,
        reason: 'url is no URL.'
      }

    let other = nodeMap.get(action.url)
    if (other && other.id !== action.id)
      return {
        isValid: false,
        reason: 'dupulicate edge.'
      }
  } else {
    if (!action.label)
      return {
        isValid: false,
        reason: 'no label.'
      }

    if (!action.url)
      return {
        isValid: false,
        reason: 'no url.'
      }

    if (!isUrl(action.url))
      return {
        isValid: false,
        reason: 'url is no URL.'
      }

    if (nodeMap.has(action.url))
      return {
        isValid: false,
        reason: 'dupulicate node.'
      }
  }

  return {
    isValid: true
  }
}

function add(nodeMap, action) {
  let id = `node-${uuid.v1()}`

  nodeMap.set(action.url, {
    id: id,
    label: action.label,
    url: action.url
  })

  return id;
}

function get(nodeMap, id) {
  for (let [url, action] of nodeMap) {
    if (action.id === id)
      return {
        url: url,
        label: action.label
      }
  }
}

function getId(nodeMap, url) {
  return nodeMap.get(url).id
}

function update(nodeMap, action) {
  console.assert(action.id, 'id is required to update a node.')

  let old = get(nodeMap, action.id),
    value = extend(old, {
      id: action.id,
      label: action.label,
      url: action.url
    })

  nodeMap.delete(old.url)
  nodeMap.set(action.url, value)
}
