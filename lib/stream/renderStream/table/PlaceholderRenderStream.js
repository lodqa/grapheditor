import {
  ActionTransform
}
from 'action-stream'
import {
  actionType, target
}
from '../../const'
import placeholderComponent from '../../../view/table/placeholderComponent'

export default class extends ActionTransform {
  constructor(selector) {
    super()
    const component = placeholderComponent(selector)

    this.bindActions(target.VIEW_NODE, [
      [actionType.SNAPSHOT, (action) => component.set(action.data)]
    ])
  }
}
