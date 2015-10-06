import {
  ActionTransform
}
from 'action-stream'
import {
  actionType, target
}
from '../../const'
import inputNodeComponent from '../../../view/nodeEditor/inputNodeComponent'

export default class extends ActionTransform {
  constructor(selector) {
    super()
    let component = inputNodeComponent(selector)

    this.bindActions(target.EDITOR, [
      [actionType.CREATE, () => component.reset()],
      [actionType.VALIDATE, (action) => component.enabled = action.isValid]
    ])
  }
}
