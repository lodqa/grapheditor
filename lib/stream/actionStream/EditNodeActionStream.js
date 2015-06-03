import delegate from 'dom-delegate'
import editNodeComponent from '../../view/nodeEditor/editNodeComponent'
import ActionReadable from '../ActionReadable'
import actionType from '../actionType'
import onSubmit from './onSubmit'

export default class extends ActionReadable {
  constructor(selector) {
    super()

    let component = editNodeComponent(selector),
      container = delegate(component.component)

    container.on('click', '.button', e => onSubmit(component, 'node', actionType.UPDATE, this))

    let inputHandler = e => this.push({
      target: 'edit-node',
      type: actionType.INPUT
    })

    container.on('input', '.label', inputHandler)
    container.on('input', '.url', inputHandler)
    container.on('click', '.cancel-button', e => this.push({
      target: 'node',
      type: actionType.CANCEL
    }))
  }
}
