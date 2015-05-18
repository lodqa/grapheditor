import ActionTransform from '../ActionTransform'

export default class NodeRenderStream extends ActionTransform {
  constructor(component) {
    super()

    this._component = component
  }
  _transformAction(action, push) {
    if (action.target === 'node') {
      handleNode(this._component, action, push)
    }
  }
}

function handleNode(component, action, push) {
  switch (action.type) {
    case 'create':
      component.createNode(action.id, action.label, action.url)
      push(action)
      break
    case 'select':
      component.select(action.id)
      push(action)
  }
}
