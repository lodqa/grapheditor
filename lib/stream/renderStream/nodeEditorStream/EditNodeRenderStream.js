import {
  ActionTransform
}
from 'action-stream'
import {
  actionType, target
}
from '../../const'
import editNodeComponent from '../../../view/nodeEditor/editNodeComponent'

export default class extends ActionTransform {
  constructor(selector) {
    super()
    let component = editNodeComponent(selector)

    this.bindActions(target.VIEW_NODE, [
      [actionType.SELECT, (action, push) => component.value = action],
      [actionType.UPDATE, (action, push) => component.reset()],
      [actionType.VALIDATE, (action, push) => component.enabled = action.isValid]
    ])
  }
}
