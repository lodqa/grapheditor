import extend from 'xtend'
import actionType from '../../actionType'

export default function(nodes, action, push) {
  switch (action.type) {
    case actionType.CREATE:
      createNode(nodes, action, push)
      break
    case actionType.UPDATE:
      updateNode(nodes, action, push)
      break
    case actionType.SELECT:
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
      type: actionType.SNAPSHOT,
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
      type: actionType.WARN,
      message: `${action.url} exists already.`
    }
  )
}
