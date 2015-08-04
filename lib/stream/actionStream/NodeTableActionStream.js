import debounce from 'debounce'
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

export default class extends ActionReadable {
  constructor(selector) {
    super(selector)
    this.name = 'NodeTableActionStream'
  }
  _bindComponent(selector, push) {
    let component = nodeTableComponent(selector),
      container = delegate(component.component)

    // headers
    container.on('click', '.lookup-all-button', e => push({
      target: target.MODEL_NODE,
      type: actionType.LOOKUP
    }))

    container.on('click', '.delete-all-button', e => {
      for (var n of component.ractive.get('nodes')) {
        push({
          target: target.MODEL_NODE,
          type: actionType.DELETE,
          id: n.id
        })
      }
    })

    // nodes
    component.ractive.observe(
      'nodes.*.label',
      debounce((newValue, oldValue, keypath, index) => updateLabel(component, index, push), 10)
    )
    container.on('keyup', '.label input', e => {
      if (e.key === 'Enter' && e.target.value) {
        pushNodeId(e, component, actionType.LOOKUP, push)
      }
    })
    container.on('click', '.node .lookup-button', e => pushNodeId(e, component, actionType.LOOKUP, push))
    container.on('click', '.label .delete-button', e => pushNodeId(e, component, actionType.DELETE, push))

    // terms
    component.ractive.observe(
      'nodes.*.terms.*.enable nodes.*.terms.*.value',
      debounce((newValue, oldValue, keypath, nodeIndex) => updateTerm(component, nodeIndex, push), 200)
    )
    container.on('keyup', '.term .add input', e => {
      if (e.key === 'Enter' && e.target.value) {
        addTerm(component, e.target, push)
      }
    })
    container.on('click', '.term .add-button', e => addTermButtonClick(e, component, push))

    // rows
    container.on('mouseover', 'tr', e => pushNodeId(e, component, actionType.HOVER, push))
    container.on('mouseout', 'tr', e => pushNodeId(e, component, actionType.UNHOVER, push))
  }
}

function updateLabel(component, index, push) {
  let node = component.getNodeValue(index)

  push({
    target: target.MODEL_NODE,
    type: actionType.UPDATE_LABEL,
    id: node.id,
    label: node.label
  })
}

function updateTerm(component, index, push) {
  let node = component.getNodeValue(index)

  pushUpdateTerm(push, node.id, node.terms)
}

function addTermButtonClick(e, component, push) {
  let button = getButton(e.target),
    input = button.previousElementSibling,
    newValue = input.value

  addTerm(component, input, push)
}

function addTerm(component, input, push) {
  let newValue = input.value

  if (newValue) {
    let index = component.getNodeIndex(input),
      node = component.getNodeValue(index)

    pushUpdateTerm(push, node.id, node.terms.concat({
      enable: true,
      value: newValue
    }))

    input.value = ''
  }
}

function pushUpdateTerm(push, id, terms) {
  push({
    target: target.MODEL_NODE,
    type: actionType.UPDATE_TERM,
    id: id,
    terms: terms
  })
}

function getButton(element) {
  if (element.tagName === "I") {
    return element.parentElement
  } else {
    return element
  }
}

function pushNodeId(event, component, type, push) {
  let nodeId = component.getNodeId(event.target)

  if (nodeId)
    push({
      target: target.MODEL_NODE,
      type: type,
      id: nodeId
    })
}
