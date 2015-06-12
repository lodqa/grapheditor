import {
  ActionTransform
}
from 'action-stream'
import {
  actionType, target
}
from '../const'
import nodeTableComponent from '../../view/nodeTableComponent'

export default class extends ActionTransform {
  constructor(selector) {
    super()
    this._component = nodeTableComponent(selector)
  }
  _transformAction(action, push) {
    if (action.target === target.VIEW_NODE) {
      handleNode(this._component, action, push)
    }
  }
}

function handleNode(component, action, push) {
  switch (action.type) {
    case actionType.SNAPSHOT:
      component.set(action.nodes)
      break
    case actionType.SELECT:
      component.select(action.id)
      break
    case actionType.UNSELECT:
      component.unselect()
      break
    case actionType.HOVER:
      component.hover(action.id)
      break
    case actionType.UNHOVER:
      component.unhover(action.id)
  }
}
