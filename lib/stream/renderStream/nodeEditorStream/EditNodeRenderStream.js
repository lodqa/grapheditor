import ActionTransform from '../../ActionTransform'
import editNodeComponent from '../../../view/nodeEditor/editNodeComponent'

export default class extends ActionTransform {
  constructor(selector) {
    super()
    this._component = editNodeComponent(selector)
  }
  _transformAction(action, push) {
    if (action.target === 'node') {
      handleNode(this._component, action, push)
    }

    if (action.target === 'edit-node') {
      handleView(this._component, action, push)
    }
  }
}

function handleNode(component, action, push) {
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
