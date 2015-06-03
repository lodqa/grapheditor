import uuid from 'uuid'
import toArray from './toArray'

export default function() {
  let nodes = new Map()

  return {
    add: (action) => add(nodes, action),
    get: (id) => get(nodes, id),
    getId: (url) => getId(nodes, url),
    set: (action) => set(nodes, action),
    validate: (action) => validate(nodes, action),
    taArray: () => toArray(nodes)
  }
}

function add(nodes, action) {
  if (!validate(nodes, action))
    throw new Error('Node validate error: ' + action.url)

  action.id = `node${uuid.v1()}`
  nodes.set(action.url, toNode(action))
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

function set(nodes, action) {
  if (!validate(nodes, action))
    throw new Error('Node validate error: ' + action.url)

  if (!action.id)
    throw new Error('No id of the node updating: ' + action.url)

  let oldURL = get(nodes, action.id).url

  nodes.delete(oldURL)
  nodes.set(action.url, toNode(action))
}

function toNode(action) {
  return {
    id: action.id,
    label: action.label,
    url: action.url
  }
}

function validate(nodes, action) {
  return action.url && !nodes.has(action.url)
}
