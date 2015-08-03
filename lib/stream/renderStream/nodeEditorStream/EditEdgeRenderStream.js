import {
  ActionTransform
}
from 'action-stream'
import {
  actionType, target
}
from '../../const'
import editEdgeComponent from '../../../view/nodeEditor/editEdgeComponent'

export default class extends ActionTransform {
  constructor(selector) {
    super()
    let component = editEdgeComponent(selector)

    this.bindActions(target.EDITOR, [
      [actionType.SELECT, (action, push) => component.value = action]
    ])
  }
}
