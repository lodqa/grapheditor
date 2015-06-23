import extend from 'xtend'
import {
  actionType, target
}
from '../../const'

let handelers = {}
handelers[actionType.CREATE] = createNode
handelers[actionType.HOVER] = hoverNode
handelers[actionType.SELECT] = selectNode
handelers[actionType.UNHOVER] = unhoverNode
handelers[actionType.UPDATE] = updateNode
handelers[actionType.DELETE] = deleteNode
handelers[actionType.VALIDATE] = validateNode

export default function(nodes, action, push) {
  if (handelers[action.type])
    handelers[action.type](nodes, action, push)
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

function hoverNode(nodes, action, push) {
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

function unhoverNode(nodes, action, push) {
  push({
    target: target.VIEW_NODE
  })
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
