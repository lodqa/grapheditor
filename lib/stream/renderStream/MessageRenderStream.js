import ActionTransform from '../ActionTransform'
import {
  actionType, target
}
from '../const'
import messageComponent from '../../view/messageComponent'

export default class extends ActionTransform {
  constructor(selector) {
    super()
    this._component = messageComponent(selector)
  }
  _transformAction(action, push) {
    if (action.target === target.VIEW_NODE) {
      handleNode(this._component, action, push)
    }

    if (action.target === target.VIEW_EDGE) {
      handleEdge(this._component, action, push)
    }
  }
}

function handleNode(component, action, push) {
  switch (action.type) {
    case actionType.UNSELECT:
      component.reset()
      break
    case actionType.VALIDATE:
      if (!action.isValid)
        component.warn(action.reason)
      else
        component.reset()
  }
}

function handleEdge(component, action, push) {
  switch (action.type) {
    case actionType.UNSELECT:
      component.reset()
      break
    case actionType.VALIDATE:
      if (!action.isValid)
        component.warn(action.reason)
      else
        component.reset()
  }
}
