export default function() {
  let nodes = new Map()

  return {
    add: (action) => add(nodes, action)
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

function validate(nodes, action) {
  return action.url && !nodes.has(action.url)
}
