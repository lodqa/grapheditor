export default function() {
  let nodes = new Map()

  return {
    add: (action) => add(nodes, action),
    get: (id) => get(nodes, id),
    set: (action) => set(nodes, action),
    validate: (action) => validate(nodes, action)
  }
}

function add(nodes, action) {
  if (!validate(nodes, action))
    throw new Error('Node validate error: ' + action.url)

  action.id = `node${Date.now()}`
  nodes.set(action.url, action)
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

function set(nodes, action) {
  if (!validate(nodes, action))
    throw new Error('Node validate error: ' + action.url)

  if (!action.id)
    throw new Error('No id of the node updating: ' + action.url)

  let oldURL = get(nodes, action.id).url

  nodes.delete(oldURL)
  nodes.set(action.url, action)
}

function validate(nodes, action) {
  return action.url && !nodes.has(action.url)
}
