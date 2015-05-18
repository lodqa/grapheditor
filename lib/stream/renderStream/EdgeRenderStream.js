import ActionTransform from '../ActionTransform'
import graphComponent from '../../view/graphComponent'

export default class extends ActionTransform {
  constructor(selector) {
    super()

    this._component = graphComponent(selector)
  }
  _transformAction(action, push) {
    if (action.target === 'edge') {
      console.log('edge', action)
      push(action)
    }
  }
}
