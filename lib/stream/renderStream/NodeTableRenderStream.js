import ActionTransform from '../ActionTransform'
import nodeTableComponent from '../../view/nodeTableComponent'

export default class extends ActionTransform {
  constructor(selector) {
    super()
    this._component = nodeTableComponent(selector)
  }
  _transformAction(action, push) {
    if (action.target === 'node') {
      handleNode(this._component, action, push)
    }
  }
}

function handleNode(component, action, push) {
  switch (action.type) {
    case 'snapshot':
      component.set(action.nodes)
      break;
    case 'select':
      component.select(action.id)
      break;
    case 'unselect':
      component.unselect()
  }
}
