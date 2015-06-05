import ActionTransform from '../../ActionTransform'
import {
  actionType, target
}
from '../../const'
import editNodeComponent from '../../../view/nodeEditor/editNodeComponent'

export default class extends ActionTransform {
  constructor(selector) {
    super()
    this._component = editNodeComponent(selector)
  }
  _transformAction(action, push) {
    if (action.target === target.VIEW_NODE) {
      handleNode(this._component, action, push)
    }
  }
}

function handleNode(component, action, push) {
  switch (action.type) {
    case actionType.UPDATE:
      component.reset()
      break
    case actionType.SELECT:
      component.value = action
      break
    case actionType.VALIDATE:
      component.enabled = action.isValid
  }
}
