import {
  actionType, target
}
from '../../const'

export default function(nodes) {
  return [
    [actionType.CREATE, (action, push) => createNode(nodes, action, push)],
    [actionType.DELETE, (action, push) => deleteNode(nodes, action, push)],
    [actionType.HOVER, (action, push) => toView(nodes, action, push)],
    [actionType.SELECT, (action, push) => selectNode(nodes, action, push)],
    [actionType.UNHOVER, (action, push) => toView(nodes, action, push)],
    [actionType.UPDATE_LABEL, (action, push) => updateNodeLabel(nodes, action, push)],
    [actionType.UPDATE_TERM, (action, push) => updateNodeTerm(nodes, action, push)],
    [actionType.VALIDATE, (action, push) => validateNode(nodes, action, push)]
  ]
}

function createNode(nodes, action, push) {
  let id = nodes.add(action)

  push({
    target: target.VIEW_NODE,
    id: id
  })
  push({
    target: target.VIEW_NODE,
    type: actionType.SNAPSHOT,
    nodes: nodes.taArray()
  })
}

function toView(nodes, action, push) {
  push({
    target: target.VIEW_NODE
  })
}

function selectNode(nodes, action, push) {
  push(
    Object.assign(
      nodes.get(action.id), {
        target: target.VIEW_NODE
      }
    )
  )
}

function updateNodeLabel(nodes, action, push) {
  nodes.setLabel(action)
  propagate(nodes, push)
}

function updateNodeTerm(nodes, action, push) {
  nodes.setTerm(action)
  propagate(nodes, push)
}

function deleteNode(nodes, action, push) {
  nodes.del(action.id)

  propagate(nodes, push)
}

function propagate(nodes, push) {
  push({
    target: target.VIEW_NODE
  })
  push({
    target: target.VIEW_NODE,
    type: actionType.SNAPSHOT,
    nodes: nodes.taArray()
  })
}

function validateNode(nodes, action, push) {
  push(
    Object.assign({
      target: target.VIEW_NODE
    }, nodes.verify(action))
  )
}
