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

    component.ractive.observe('nodes.*.label', (newValue, oldValue, keypath, index) => {
      let node = component.ractive.get('nodes.' + index)

      push({
        target: target.MODEL_NODE,
        type: actionType.UPDATE_LABEL,
        id: node.id,
        label: newValue
      })
    })

    container.on('click', '.lookup-button', e => {
      let el = e.target
        .previousElementSibling

      pushNodeId(push, el, actionType.LOOKUP)
    })

    container.on('click', '.label .delete-button', e => {
      let el = e.target
        .previousElementSibling
        .previousElementSibling

      pushNodeId(push, el, actionType.DELETE)
    })

    component.ractive.observe('nodes.*.terms.*.enable nodes.*.terms.*.value', (newValue, oldValue, keypath, nodeIndex, termIndex) => {
      let node = component.ractive.get(`nodes.${nodeIndex}`)

      push({
        target: target.MODEL_NODE,
        type: actionType.UPDATE_TERM,
        id: node.id,
        terms: node.terms
      })
    })

    container.on('click', '.term .add-button', e => {
      let input = e.target.previousElementSibling,
        newValue = input.value

      if (newValue) {
        let index = e.target
          .parentElement
          .parentElement
          .getAttribute('data-index'),
          node = component.ractive.get(`nodes.${index}`)

        push({
          target: target.MODEL_NODE,
          type: actionType.UPDATE_TERM,
          id: node.id,
          terms: node.terms.concat({
            enable: true,
            value: newValue
          })
        })

        input.value = ''
      }
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
    id: el.getAttribute("data-id")
  })
}
