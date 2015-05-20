import ActionTransform from '../ActionTransform'
import editEdgeComponent from '../../view/editEdgeComponent'

export default class extends ActionTransform {
  constructor(selector) {
    super()
    this._component = editEdgeComponent(selector)
  }
  _transformAction(action, push) {
    if (action.target === 'edge') {
      handleEdge(this._component, action, push)
    }

    if (action.target === 'edit-node') {
      handleView(this._component, action, push)
    }
  }
}

function handleEdge(component, action, push) {
  switch (action.type) {
    case 'update':
      component.reset()
      break;
  }
}

function handleView(component, action, push) {
  switch (action.type) {
    case 'input':
      component.updateDisable()
  }
}
