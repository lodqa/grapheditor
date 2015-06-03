import ActionTransform from '../ActionTransform'
import actionType from '../actionType'
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
  }
}

function handleNode(component, action, push) {
  switch (action.type) {
    case actionType.CREATE:
      component.createNode(action.id, action.label, action.url)
      break
    case actionType.UPDATE:
      component.updateNode(action.id, action.label, action.url)
      break
    case actionType.SELECT:
      component.selectNode(action.id)
      break
    case actionType.UNSELECT:
      component.unselectNode()
  }
}
