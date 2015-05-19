import ActionTransform from '../ActionTransform'
import editEdgeComponent from '../../view/editEdgeComponent'

export default class extends ActionTransform {
  constructor(selector) {
    super()
    this._component = editEdgeComponent(selector)
  }
  _transformAction(action, push) {
    if (action.target === 'node') {
      handleNode(this._component, action, push)
    }

    if (action.target === 'edge') {
      handleEdge(this._component, action, push)
    }

    if (action.target === 'edit-node') {
      handleView(this._component, action, push)
    }
  }
}

function handleNode(component, action, push) {
  switch (action.type) {
    case 'select':
      component.hide()
  }
}

function handleEdge(component, action, push) {
  switch (action.type) {
    case 'update':
      component.reset()
      break;
    case 'afterCreate':
      component.value = action
      break;
    case 'detach':
      component.hide()
  }
}

function handleView(component, action, push) {
  switch (action.type) {
    case 'input':
      component.updateDisable()
  }
}
