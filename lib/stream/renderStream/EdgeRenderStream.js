import ActionTransform from '../ActionTransform'
import graphComponent from '../../view/graphComponent'

export default class extends ActionTransform {
  constructor(selector) {
    super()

    this._component = graphComponent(selector)
  }
  _transformAction(action, push) {
    if (action.target === 'node') {
      handleNode(this._component, action, push)
    }

    if (action.target === 'edge') {
      handleEdge(this._component, action, push)
    }
  }
}

function handleNode(component, action, push) {
  switch (action.type) {
    case 'select':
      component.unselectEdge()
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
      component.unselectEdge()
      break
    case 'cancel':
      component.unselectEdge()
      break
    case 'update':
      component.updateEdge(action.sourceId, action.targetId, action.label, action.url)
      component.unselectEdge()
  }
}
