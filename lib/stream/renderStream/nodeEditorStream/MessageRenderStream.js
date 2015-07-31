import {
  ActionTransform
}
from 'action-stream'
import {
  actionType, target
}
from '../../const'
import messageComponent from '../../../view/messageComponent'

export default class extends ActionTransform {
  constructor(selector) {
    super()
    let component = this._component = messageComponent(selector),
      clear = (action, push) => component.reset()

    this.bindActions(target.EDITOR, [
      [actionType.SELECT, clear],
      [actionType.UNSELECT, clear],
      [actionType.VALIDATE, (action, push) => showValidation(component, action)]
    ])
  }
}

function showValidation(component, action) {
  if (!action.isValid)
    component.warn(action.reason)
  else
    component.reset()
}
