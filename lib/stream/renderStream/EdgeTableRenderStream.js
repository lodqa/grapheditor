import ActionTransform from '../ActionTransform'
import edgeTableComponent from '../../view/edgeTableComponent'

export default class extends ActionTransform {
  constructor(selector) {
    super()
    this._component = edgeTableComponent(selector)
  }
  _transformAction(action, push) {
    if (action.target === 'edge') {
      handleEdge(this._component, action, push)
    }
  }
}

function handleEdge(component, action, push) {
  switch (action.type) {
    case 'snapshot':
      component.set(action.edges)
      break;
    case 'select':
      component.select(action.sourceId, action.targetId)
      break;
    case 'unselect':
      component.unselect()
  }
}
