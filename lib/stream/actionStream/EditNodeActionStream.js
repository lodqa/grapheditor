import delegate from 'dom-delegate'
import editNodeComponent from '../../view/nodeEditor/editNodeComponent'
import ActionReadable from '../ActionReadable'
import onSubmit from './onSubmit'

export default class extends ActionReadable {
  constructor(selector) {
    super()

    let component = editNodeComponent(selector),
      container = delegate(component.component)

    container.on('click', '.button', e => onSubmit(component, 'update', this))

    let inputHandler = e => this.push({
      target: 'edit-node',
      type: 'input'
    })

    container.on('input', '.label', inputHandler)
    container.on('input', '.url', inputHandler)
    container.on('click', '.cancel-button', e => this.push({
      target: 'node',
      type: 'unselect'
    }))
  }
}
