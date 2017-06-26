import {
  ActionTransform
}
from 'action-stream'
import {
  actionType,
  target,
  state
}
from '../../const'
import messageComponent from '../../../view/messageComponent'

export default class extends ActionTransform {
  constructor(selector) {
    super()
    const component = this._component = messageComponent(selector)

    this.bindActions(target.TABLE, [
      [actionType.UPDATE_STATE, (action) => show(component, action)]
    ])
  }
}

function show(component, action) {
  switch (action.state) {
  case state.SEARCHING:
    component.update('')
    break
  case state.DONE:
    component.update('')
    break
  case state.NO_RESULT:
    component.update('Terms are not found')
    break
  case state.ERROR:
    component.update('Server Error!!')
    break
  default:
    console.log('opps unkown state: ', action.state)
  }
}
