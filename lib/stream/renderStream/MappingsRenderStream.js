import {
  ActionTransform
}
from 'action-stream'
import {
  actionType, target
}
from '../const'
import pgpComponent from '../../view/mappingsComponent'

export default class extends ActionTransform {
  constructor(selector) {
    super()
    this._component = pgpComponent(selector)
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
      component.setNode(action.nodes)
      break
  }
}
