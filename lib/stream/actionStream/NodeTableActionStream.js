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
    container.on('click', '.lookup-all-button', () => push({
      target: target.MODEL_NODE,
      type: actionType.LOOKUP
    }))

    container.on('click', '.delete-all-button', () => {
      for (let n of component.ractive.get('nodes')) {
        push({
          target: target.MODEL_NODE,
          type: actionType.DELETE,
          id: n.id
        })
      }
    })

    // nodes
    container.on('change', '.focus input', (e) => pushNodeId(e, component, actionType.FOCUS, push))
    component.ractive.observe(
      'nodes.*.text',
      debounce((newValue, oldValue, keypath, index) => updateText(component, index, push), 10)
    )
    container.on('keyup', '.text input', (e) => {
      if (e.key === 'Enter' && e.target.value) {
        pushNodeId(e, component, actionType.LOOKUP, push)
      }
    })
    container.on('click', '.node .lookup-button', (e) => pushNodeId(e, component, actionType.LOOKUP, push))
    container.on('click', '.text .delete-button', (e) => pushNodeId(e, component, actionType.DELETE, push))

    // term
    component.ractive.observe(
      'nodes.*.terms.*.enable nodes.*.terms.*.value',
      debounce((newValue, oldValue, keypath, nodeIndex) => updateTerm(component, nodeIndex, push), 200)
    )
    container.on('click', '.term .delete-button', (e) => delTermButtonClick(e, component, push))
    container.on('mouseover', '.term .delete-button', (e) => pushTermId(e, component, actionType.HOVER_TERM, push))
    container.on('mouseout', '.term .delete-button', (e) => pushTermId(e, component, actionType.UNHOVER_TERM, push))
    container.on('keyup', '.url .add input', (e) => {
      if (e.key === 'Enter' && e.target.value) {
        addTerm(component, e.target, push)
      }
    })
    container.on('click', '.url .add-button', (e) => addTermButtonClick(e, component, push))

    // rows
    container.on('mouseover', 'tr', (e) => pushNodeId(e, component, actionType.HOVER, push))
    container.on('mouseout', 'tr', (e) => pushNodeId(e, component, actionType.UNHOVER, push))
  }
}

function updateText(component, index, push) {
  if (component.has(index)) {
    let node = component.getNodeValue(index)

    push({
      target: target.MODEL_NODE,
      type: actionType.UPDATE_TEXT,
      id: node.id,
      text: node.text
    })
  }
}

function updateTerm(component, index, push) {
  if (component.has(index)) {
    let node = component.getNodeValue(index)

    pushUpdateTerm(push, node.id, node.terms)
  }
}

function delTermButtonClick(e, component, push) {
  let button = getButton(e.target),
    nodeIndex = component.getNodeIndex(button),
    termIndex = component.getTermIndex(button),
    node = component.getNodeValue(nodeIndex),
    newTerms = node.terms.filter((e, index) => index !== termIndex)

  pushUpdateTerm(push, node.id, newTerms)
}

function addTermButtonClick(e, component, push) {
  let button = getButton(e.target),
    input = button.previousElementSibling

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
    id,
    terms
  })
}

function getButton(element) {
  if (element.tagName === 'I') {
    return element.parentElement
  }

  return element
}

function pushTermId(event, component, type, push) {
  let nodeId = component.getNodeId(event.target),
    termIndex = component.getTermIndex(event.target)

  // A terimIndex may be 0.
  if (nodeId && termIndex !== null) {
    push({
      target: target.VIEW_NODE,
      type,
      id: nodeId,
      index: termIndex
    })
  }
}

function pushNodeId(event, component, type, push) {
  let nodeId = component.getNodeId(event.target)

  if (nodeId) {
    push({
      target: target.MODEL_NODE,
      type,
      id: nodeId
    })
  }
}
