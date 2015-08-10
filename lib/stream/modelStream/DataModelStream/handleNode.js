import {
  actionType, target
}
from '../../const'

export default function(model) {
  return [
    [actionType.CREATE, (action, push) => createNode(model, action, push)],
    [actionType.DELETE, (action, push) => deleteNode(model, action, push)],
    [actionType.HOVER, (action, push) => push(target.VIEW_NODE)],
    [actionType.UNHOVER, (action, push) => push(target.VIEW_NODE)],
    [actionType.UPDATE_LABEL, (action, push) => updateNodeLabel(model, action, push)],
    [actionType.UPDATE_TERM, (action, push) => updateNodeTerm(model, action, push)],
    [actionType.VALIDATE, (action, push) => validateNode(model, action, push)]
  ]
}

function createNode(model, action, push) {
  console.assert(action.label, 'A node MUST have the label.', action)

  let id = model.add(action)

  push({
    target: target.LAYOUT_NODE,
    id: id
  })

  push(target.EDITOR)

  push({
    target: target.VIEW_NODE,
    id: id
  })

  snapsoht(push, model)
}

function updateNodeLabel(model, action, push) {
  // Push actions only when the label is changed.
  if (model.setLabel(action)) {
    push(target.VIEW_NODE)
    snapsoht(push, model)
  }
}

function updateNodeTerm(model, action, push) {
  // Push actions only when the terms are changed.
  if (model.setTerm(action))
    snapsoht(push, model)
}

function deleteNode(model, action, push) {
  model.del(action.id)

  push(target.LAYOUT_NODE)
  push(target.VIEW_NODE)
  snapsoht(push, model)
}

function snapsoht(push, model) {
  push({
    target: target.VIEW_NODE,
    type: actionType.SNAPSHOT,
    nodes: model.toArray()
  })
}

function validateNode(model, action, push) {
  push(
    Object.assign({
      target: target.EDITOR
    }, model.verify(action))
  )
}
