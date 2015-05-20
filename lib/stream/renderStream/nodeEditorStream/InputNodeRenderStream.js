import ActionTransform from '../../ActionTransform'
import inputNodeComponent from '../../../view/nodeEditor/inputNodeComponent'

export default class extends ActionTransform {
  constructor(selector) {
    super()
    this._component = inputNodeComponent(selector)
  }
  _transformAction(action, push) {
    if (action.target === 'node') {
      handleNode(this._component, action, push)
    }

    if (action.target === 'input-node') {
      handleView(this._component, action, push)
    }
  }
}

function handleNode(component, action, push) {
  switch (action.type) {
    case 'create':
      component.reset()
  }
}

function handleView(component, action, push) {
  switch (action.type) {
    case 'input':
      component.updateDisable()
  }
}
