import {
  actionType
}
from '../../../const'

export default function(push, informations) {
  for (const {model, newValue, target} of informations) {
    push(updateModel(model, newValue, target))
  }
}

function updateModel(model, newValue, target) {
  return newValue
    .then((value) => {
      // A guard for when resposes from the server are null.
      model.setMappings(value || {})

      return {
        target,
        type: actionType.SNAPSHOT,
        data: model.snapshot
      }
    })
}
