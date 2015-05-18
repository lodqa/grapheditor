import ActionTransform from '../ActionTransform'

export default class extends ActionTransform {
  constructor(component) {
    super()
    this._component = component
  }
  _transformAction(action, push) {
    if (action.target === 'node') {
      handleNode(this._component, action, push)
    }

    if (action.target === 'view') {
      handleView(this._component, action, push)
    }
  }
}

function handleNode(component, action, push) {
  switch (action.type) {
    case 'create':
      component.reset()
      push(action)
  }
}

function handleView(component, action, push) {
  switch (action.type) {
    case 'input':
      component.updateDisable()
      push(action)
  }
}
