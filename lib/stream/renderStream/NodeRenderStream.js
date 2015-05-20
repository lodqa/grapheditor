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
    case 'create':
      component.createNode(action.id, action.label, action.url)
      break
    case 'update':
      component.updateNode(action.id, action.label, action.url)
      component.unselectNode()
      break
    case 'select':
      component.selectNode(action.id)
      break
    case 'unselect':
      component.unselectNode()
  }
}

function handleEdge(component, action, push) {
  switch (action.type) {
    case 'afterCreate':
      component.unselectNode()
  }
}
