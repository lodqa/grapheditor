import extend from 'xtend'
import uuid from 'uuid'
import toArray from './toArray'
import isUrl from './isUrl'

export default function() {
  let nodes = new Map()

  return {
    name: 'Nade Map',
    verify: (action) => verify(nodes, action),
    add: (action) => add(nodes, action),
    get: (id) => get(nodes, id),
    getId: (url) => getId(nodes, url),
    set: (action) => update(nodes, action),
    taArray: () => toArray(nodes)
  }
}

function verify(nodes, action) {
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

    let other = nodes.get(action.url)
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

    if (nodes.has(action.url))
      return {
        isValid: false,
        reason: 'dupulicate node.'
      }
  }

  return {
    isValid: true
  }
}

function add(nodes, action) {
  let id = `node-${uuid.v1()}`

  nodes.set(action.url, {
    id: id,
    label: action.label,
    url: action.url
  })

  return id;
}

function get(nodes, id) {
  for (let [url, action] of nodes) {
    if (action.id === id)
      return {
        url: url,
        label: action.label
      }
  }
}

function getId(nodes, url) {
  return nodes.get(url).id
}

function update(nodes, action) {
  console.assert(action.id, 'id is required to update a node.')

  let old = get(nodes, action.id),
    value = extend(old, {
      id: action.id,
      label: action.label,
      url: action.url
    })

  nodes.delete(old.url)
  nodes.set(action.url, value)
}
