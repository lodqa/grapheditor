import ActionTransform from '../ActionTransform'
import graphComponent from '../../view/graphComponent'

export default class extends ActionTransform {
  constructor(selector) {
    super()

    this._component = graphComponent(selector)
  }
  _transformAction(action, push) {
    if (action.target === 'edge') {
      handleEdge(this._component, action, push)
    }
  }
}

function handleEdge(component, action, push) {
  switch (action.type) {
    case 'afterCreate':
      component.selectEdge(action.label)
      break
    case 'detach':
      component.detachEdge(action.connection)
  }
}
