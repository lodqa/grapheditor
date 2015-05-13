export default function() {
  let nodes = new Map()

  return {
    add: (action) => add(nodes, action),
    get: (id) => get(nodes, id)
  }
}

function add(nodes, action) {
  if (validate(nodes, action)) {
    action.id = `node${Date.now()}`
    nodes.set(action.url, action)
    return true
  }

  return false;
}

function get(nodes, id) {
  for (let [url, action] of nodes) {
    if (action.id === id)
      return url
  }
}

function validate(nodes, action) {
  return action.url && !nodes.has(action.url)
}
