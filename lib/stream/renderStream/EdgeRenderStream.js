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
    case 'create':
      component.createEdge(action.sourceId, action.targetId, action.label, action.url)
      break
    case 'select':
      component.selectEdge(action.connection)
      break
    case 'detach':
      component.detachEdge(action.connection)
      break
    case 'update':
      component.updateEdge(action.sourceId, action.targetId, action.label, action.url)
      break
    case 'unselect':
      component.unselectEdge()
  }
}
