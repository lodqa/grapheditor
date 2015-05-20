import delegate from 'dom-delegate'
import inputNodeComponent from '../../view/nodeEditor/inputNodeComponent'
import ActionReadable from '../ActionReadable'
import onSubmit from './onSubmit'

export default class extends ActionReadable {
  constructor(selector) {
    super()

    let component = inputNodeComponent(selector),
      container = delegate(component.component)

    container.on('click', '.button', e => onSubmit(component, 'node', 'create', this))

    let inputHandler = e => this.push({
      target: 'input-node',
      type: 'input'
    })

    container.on('input', '.label', inputHandler)
    container.on('input', '.url', inputHandler)
  }
}
