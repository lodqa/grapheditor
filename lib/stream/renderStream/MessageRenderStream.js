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
    if (action.target === target.MODEL_NODE) {
      handleNode(this._component, action, push)
    }

    if (action.target === target.MESSAGE) {
      handleMessage(this._component, action, push)
    }
  }
}

function handleNode(component, action, push) {
  switch (action.type) {
    case actionType.CREATE:
    case actionType.UPDATE:
      component.reset()
  }
}

function handleMessage(component, action, push) {
  switch (action.type) {
    case actionType.WARN:
      component.warn(action.message)
  }
}
