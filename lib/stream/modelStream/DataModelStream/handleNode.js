import extend from 'xtend'
import {
  actionType, target
}
from '../../const'

export default function(nodes, action, push) {
  switch (action.type) {
    case actionType.CREATE:
      createNode(nodes, action, push)
      break
    case actionType.UPDATE:
      updateNode(nodes, action, push)
      break
    case actionType.SELECT:
      push(extend(nodes.get(action.id), {
        target: target.VIEW_NODE
      }))
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
      target: target.VIEW_NODE
    })
    push({
      target: target.VIEW_NODE,
      type: actionType.SNAPSHOT,
      nodes: nodes.taArray()
    })
  } else {
    push(toDuplicate(action))
  }
}

function toDuplicate(action) {
  return {
    target: target.MESSAGE,
    type: actionType.WARN,
    message: `${action.url} exists already.`
  }
}
