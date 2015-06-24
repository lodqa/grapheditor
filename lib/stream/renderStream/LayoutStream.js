import {
  ActionTransform
}
from 'action-stream'
import {
  actionType, target
}
from '../const'
import layoutComponent from '../../view/forceDirectedLayoutComponent'

export default class extends ActionTransform {
  constructor() {
    super()

    this._component = layoutComponent()
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
    case actionType.CREATE:
      component.addNode(action.id)
      break
    case actionType.DELETE:
      component.delNode(action.id)
      break
    case actionType.DRAG:
      component.drag(action.id, action.x, action.y)
  }
}

function handleEdge(component, action, push) {
  switch (action.type) {
    case actionType.AFTER_CREATE:
      component.addEdge(action.sourceId, action.targetId)
      break
    case actionType.DELETE:
      component.delEdge(action.sourceId, action.targetId)
  }
}
