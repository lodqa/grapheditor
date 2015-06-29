import extend from 'xtend'
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
    [actionType.UPDATE, (action, push) => updateNode(nodes, action, push)],
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
    console.log('aaaaaaaaaaa');
  push({
    target: target.VIEW_NODE
  })
}

function selectNode(nodes, action, push) {
  push(
    extend(
      nodes.get(action.id), {
        target: target.VIEW_NODE
      }
    )
  )
}

function updateNode(nodes, action, push) {
  nodes.set(action)
  push({
    target: target.VIEW_NODE
  })
  push({
    target: target.VIEW_NODE,
    type: actionType.SNAPSHOT,
    nodes: nodes.taArray()
  })
}

function deleteNode(nodes, action, push) {
  nodes.del(action.url)

  push({
    id: action.id,
    target: target.VIEW_NODE,
    type: actionType.DELETE
  })

  push({
    target: target.VIEW_NODE,
    type: actionType.SNAPSHOT,
    nodes: nodes.taArray()
  })
}

function validateNode(nodes, action, push) {
  push(
    extend({
      target: target.VIEW_NODE
    }, nodes.verify(action))
  )
}
