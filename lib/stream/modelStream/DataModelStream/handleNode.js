import {
  actionType, target
}
from '../../const'
import forward from './forward'

export default function(model) {
  return [
    [actionType.CREATE, (action, push) => createNode(model, action, push)],
    [actionType.DELETE, (action, push) => deleteNode(model, action, push)],
    [actionType.HOVER, (action, push) => forward(push, target.VIEW_NODE)],
    [actionType.UNHOVER, (action, push) => forward(push, target.VIEW_NODE)],
    [actionType.UPDATE_LABEL, (action, push) => updateNodeLabel(model, action, push)],
    [actionType.UPDATE_TERM, (action, push) => updateNodeTerm(model, action, push)],
    [actionType.VALIDATE, (action, push) => validateNode(model, action, push)]
  ]
}

function createNode(model, action, push) {
  let id = model.add(action)

  push({
    target: target.LAYOUT_NODE,
    id: id
  })
  push({
    target: target.VIEW_NODE,
    id: id
  })
  push({
    target: target.VIEW_NODE,
    type: actionType.SNAPSHOT,
    nodes: model.toArray()
  })
}

function updateNodeLabel(model, action, push) {
  // Push actions only when the label is changed.
  if (model.setLabel(action))
    propagate(model, push)
}

function updateNodeTerm(model, action, push) {
  // Push actions only when the terms are changed.
  if (model.setTerm(action))
    propagate(model, push)
}

function deleteNode(model, action, push) {
  model.del(action.id)

  propagate(model, push)
}

function propagate(model, push) {
  forward(push, target.LAYOUT_NODE)
  forward(push, target.VIEW_NODE)

  push({
    target: target.VIEW_NODE,
    type: actionType.SNAPSHOT,
    nodes: model.toArray()
  })
}

function validateNode(model, action, push) {
  push(
    Object.assign({
      target: target.VIEW_NODE
    }, model.verify(action))
  )
}
