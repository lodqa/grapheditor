import extend from 'xtend'

export default function(nodes, action, stream) {
  switch (action.type) {
    case 'create':
      createNode(nodes, action, stream)
      break
    case 'update':
      updateNode(nodes, action, stream)
      break
    case 'select':
      stream.push(extend(action, nodes.get(action.id)))
      break
    default:
      stream.push(action)
  }
}

function createNode(nodes, action, stream) {
  if (nodes.validate(action)) {
    nodes.add(action)
    stream.push(action)
  } else {
    stream.push(toDuplicate(action))
  }
}

function updateNode(nodes, action, stream) {
  if (nodes.validate(action)) {
    nodes.set(action)
    stream.push(action)
  } else {
    stream.push(toDuplicate(action))
  }
}

function toDuplicate(action) {
  return extend(
    action, {
      target: 'message',
      type: 'warn',
      message: `${action.url} exists already.`
    }
  )
}
