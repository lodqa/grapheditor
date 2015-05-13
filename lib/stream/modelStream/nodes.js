export default function() {
  let nodes = new Map()

  return {
    nodes: nodes,
    add: (action) => {
      action.id = `node${Date.now()}`
      nodes.set(action.url, action)
    },
    validate: (action) => action.url && !nodes.has(action.url)
  }
}
