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
  ifValid(nodes, action, push, () => nodes.add(action))
}

function updateNode(nodes, action, push) {
  ifValid(nodes, action, push, () => nodes.set(action))
}

function ifValid(nodes, action, push, done) {
  if (nodes.validate(action)) {
    done()
    push({
      target: 'node',
      type: 'snapshot',
      nodes: nodes.taArray()
    })
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
