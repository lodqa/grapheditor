import extend from 'xtend'

export default function(nodes, action, stream) {
  if (action.type === 'add') {
    addNode(nodes, action, stream)
  }
}

function addNode(nodes, action, stream) {
  if (nodes.add(action)) {
    stream.push(action)
  } else {
    stream.push(toDuplicate(action))
  }
}

function toDuplicate(action) {
  return extend(
    action, {
      target: 'view',
      type: 'duplicate'
    }
  )
}
