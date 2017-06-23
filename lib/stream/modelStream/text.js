import pushSnapshot from './pushSnapshot'

export {
  appendText,
  update,
  updateTerm
}

function appendText(model, action, push, target) {
  push({
    target,
    text: model.getText(action.id)
  })
}

function update(model, action, push, target) {
  // Push actions only when the text is changed.
  if (model.setText(action)) {
    push(target)
    pushSnapshot(push, model, target)
  }
}

function updateTerm(model, action, push, target) {
  // Push actions only when the terms are changed.
  if (model.setTerm(action)) {
    pushSnapshot(push, model, target)
  }
}
