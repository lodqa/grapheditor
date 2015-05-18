import ActionTransform from '../ActionTransform'

export default class EdgeRenderStream extends ActionTransform {
  constructor(component) {
    super()

    this._component = component
  }
  _transformAction(action, push) {
    if (action.target === 'edge') {
      console.log('edge', action)
      push(action)
    }
  }
}
