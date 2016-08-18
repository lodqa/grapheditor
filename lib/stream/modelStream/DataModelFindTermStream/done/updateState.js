import {
  target,
  actionType,
  state
}
from '../../../const'

export default function(push, newValues) {
  push(Promise.all(newValues)
    .then((values) => {
      const number = values
        .map((v) => Object.values(v))
        .reduce((all, termsPerKeyword) => all.concat(termsPerKeyword), [])
        .reduce((sum, terms) => sum + terms.length, 0)

      return toMessage(number)
    })
    .catch(() => toAction(state.ERROR))
  )
}

function toMessage(number) {
  if (number === 0) {
    return toAction(state.NO_RESULT)
  }

  return toAction(state.DONE)
}

function toAction(state) {
  return {
    target: target.TABLE,
    type: actionType.UPDATE_STATE,
    state
  }
}
