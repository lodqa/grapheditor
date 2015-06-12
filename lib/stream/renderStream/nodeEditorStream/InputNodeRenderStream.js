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
    this._component = inputNodeComponent(selector)
  }
  _transformAction(action, push) {
    if (action.target === target.VIEW_NODE) {
      handleNode(this._component, action, push)
    }
  }
}

function handleNode(component, action, push) {
  switch (action.type) {
    case actionType.CREATE:
      component.reset()
      break
    case actionType.VALIDATE:
      component.enabled = action.isValid
  }
}
