import ActionTransform from '../ActionTransform'

export default class InputNodeRenderStream extends ActionTransform {
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

    if (action.target === 'message') {
      handleMessage(this._component, action, push)
    }
  }
}

function handleNode(component, action, push) {
  switch (action.type) {
    case 'create':
    case 'update':
      component.reset()
      push(action)
      break;
    case 'select':
      component.value = action
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

function handleMessage(component, action, push) {
  switch (action.type) {
    case 'warn':
      component.warn(action.message)
      push(action)
  }
}
