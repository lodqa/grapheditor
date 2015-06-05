import ActionTransform from '../../ActionTransform'
import {
  actionType, target
}
from '../../const'
import editEdgeComponent from '../../../view/nodeEditor/editEdgeComponent'

export default class extends ActionTransform {
  constructor(selector) {
    super()
    this._component = editEdgeComponent(selector)
  }
  _transformAction(action, push) {
    if (action.target === target.VIEW_EDGE) {
      handleEdge(this._component, action, push)
    }
  }
}

function handleEdge(component, action, push) {
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
