import delegate from 'dom-delegate'
import editEdgeComponent from '../../view/nodeEditor/editEdgeComponent'
import ActionReadable from '../ActionReadable'
import actionType from '../actionType'
import onSubmit from './onSubmit'

export default class extends ActionReadable {
  constructor(selector) {
    super()

    let component = editEdgeComponent(selector),
      container = delegate(component.component)

    container.on('click', '.button', e => onSubmit(component, 'edge', actionType.UPDATE, this))

    let inputHandler = e => this.push({
      target: 'edit-edge',
      type: actionType.INPUT
    })

    container.on('input', '.label', inputHandler)
    container.on('input', '.url', inputHandler)
    container.on('click', '.cancel-button', e => this.push({
      target: 'edge',
      type: actionType.CANCEL
    }))
  }
}
