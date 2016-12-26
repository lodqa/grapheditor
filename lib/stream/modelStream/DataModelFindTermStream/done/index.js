import {
  target,
  actionType,
  state
}
from '../../../const'
import updateModels from './updateModels'
import updateState from './updateState'

const start = {
  target: target.TABLE,
  type: actionType.UPDATE_STATE,
  state: state.SEARCHING
}

export default function done(push, informations) {
  push(start)
  updateModels(push, informations)
  updateState(push, informations.map((i) => i.newValue))
}
