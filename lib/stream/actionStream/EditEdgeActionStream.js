import delegate from 'dom-delegate'
import editEdgeComponent from '../../view/nodeEditor/editEdgeComponent'
import ActionReadable from '../ActionReadable'
import actionType from '../actionType'
import onSubmit from './onSubmit'

export default class extends ActionReadable {
  _bindComponent(selector, push) {
    let component = editEdgeComponent(selector),
      container = delegate(component.component)

    container.on('click', '.button', e => onSubmit(component, 'edge', actionType.UPDATE, push))

    let inputHandler = e => push({
      target: 'edit-edge',
      type: actionType.INPUT
    })

    container.on('input', '.label', inputHandler)
    container.on('input', '.url', inputHandler)
    container.on('click', '.cancel-button', e => push({
      target: 'edge',
      type: actionType.CANCEL
    }))
  }
}
