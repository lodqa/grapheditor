import delegate from 'dom-delegate'
import inputNodeComponent from '../../view/nodeEditor/inputNodeComponent'
import ActionReadable from '../ActionReadable'
import actionType from '../actionType'
import onSubmit from './onSubmit'

export default class extends ActionReadable {
  constructor(selector) {
    super()

    let component = inputNodeComponent(selector),
      container = delegate(component.component)

    container.on('click', '.button', e => onSubmit(component, 'node', actionType.CREATE, this))

    let inputHandler = e => this.push({
      target: 'input-node',
      type: actionType.INPUT
    })

    container.on('input', '.label', inputHandler)
    container.on('input', '.url', inputHandler)
  }
}
