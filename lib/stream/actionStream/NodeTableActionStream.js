import delegate from 'dom-delegate'
import {
  ActionReadable
}
from 'action-stream'
import nodeTableComponent from '../../view/nodeTableComponent'
import {
  actionType, target
}
from '../const'
import putValue from './putValue'

export default class extends ActionReadable {
  constructor(selector) {
    super(selector)
    this.name = 'NodeTableActionStream'
  }
  _bindComponent(selector, push) {
    let component = nodeTableComponent(selector),
      container = delegate(component.component),
      inputHandler = e => putValue(component, target.MODEL_NODE, actionType.VALIDATE, push)

    container.on('input', '.label input', e => {
      let el = e.target

      pushAciton(push, el, actionType.UPDATE)
    })

    container.on('click', '.lookup-button', e => {
      let el = e.target

      pushNodeId(push, el, actionType.LOOKUP)
    })

    container.on('click', '.delete-button', e => {
      let el = e.target

      pushNodeId(push, el, actionType.DELETE)
    })

    container.on('mouseover', 'tr', function(e) {
      let id = this.getAttribute('data-id')

      if (id)
        push({
          target: target.MODEL_NODE,
          type: actionType.HOVER,
          id: this.getAttribute('data-id')
        })
    })

    container.on('mouseout', 'tr', function(e) {
      let id = this.getAttribute('data-id')

      if (id)
        push({
          target: target.MODEL_NODE,
          type: actionType.UNHOVER,
          id: this.getAttribute('data-id')
        })
    })
  }
}

function pushNodeId(push, el, type) {
  push({
    target: target.MODEL_NODE,
    type: type,
    id: el.getAttribute("data-id"),
    label: el.value
  })
}
