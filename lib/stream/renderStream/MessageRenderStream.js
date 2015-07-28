import {
  ActionTransform
}
from 'action-stream'
import {
  actionType, target
}
from '../const'
import messageComponent from '../../view/messageComponent'

export default class extends ActionTransform {
  constructor(selector) {
    super()
    let component = this._component = messageComponent(selector),
      handlers = [
        [actionType.UNSELECT, (action, push) => component.reset()],
        [actionType.VALIDATE, (action, push) => {
          if (!action.isValid)
            component.warn(action.reason)
          else
            component.reset()
        }]
      ]

    this.bindActions(target.VIEW_NODE, handlers)
    this.bindActions(target.VIEW_EDGE, [
      [actionType.UNSELECT, (action, push) => component.reset()]
    ])
  }
}
