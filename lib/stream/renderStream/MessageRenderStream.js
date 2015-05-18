import ActionTransform from '../ActionTransform'
import messageComponent from '../../view/messageComponent'

export default class extends ActionTransform {
  constructor(selector) {
    super()
    this._component = messageComponent(selector)
  }
  _transformAction(action, push) {
    if (action.target === 'node') {
      handleNode(this._component, action, push)
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
  }
}

function handleMessage(component, action, push) {
  switch (action.type) {
    case 'warn':
      component.warn(action.message)
      push(action)
  }
}
