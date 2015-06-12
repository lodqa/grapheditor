import {
  ActionTransform
}
from 'action-stream'
import {
  actionType, target
}
from '../const'
import graphComponent from '../../view/graphComponent'

export default class extends ActionTransform {
  constructor(selector) {
    super()

    this._component = graphComponent(selector)
  }
  _transformAction(action, push) {
    if (action.target === target.VIEW_EDGE) {
      handleEdge(this._component, action, push)
    }
  }
}

function handleEdge(component, action, push) {
  switch (action.type) {
    case actionType.CREATE:
      component.createEdge(action.sourceId, action.targetId, action.label, action.url)
      break
    case actionType.SELECT:
      component.selectEdge(action.connection)
      break
    case actionType.DETACH:
      component.detachEdge(action.connection)
      break
    case actionType.UPDATE:
      component.updateEdge(action.sourceId, action.targetId, action.label, action.url)
      break
    case actionType.UNSELECT:
      component.unselectEdge()
  }
}
