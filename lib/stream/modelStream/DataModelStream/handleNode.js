import extend from 'xtend'

export default function(nodes, action, push) {
  switch (action.type) {
    case 'create':
      createNode(nodes, action, push)
      break
    case 'update':
      updateNode(nodes, action, push)
      break
    case 'select':
      push(extend(action, nodes.get(action.id)))
  }
}

function createNode(nodes, action, push) {
  if (nodes.validate(action)) {
    nodes.add(action)
    push(action)
  } else {
    push(toDuplicate(action))
  }
}

function updateNode(nodes, action, push) {
  if (nodes.validate(action)) {
    nodes.set(action)
    push(action)
  } else {
    push(toDuplicate(action))
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
