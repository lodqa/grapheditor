import debounce from 'debounce'
import delegate from 'dom-delegate'
import {
  ActionReadable
}
from 'action-stream'
import nodeTableComponent from '../../view/table/nodeTableComponent'
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
    container.on('click', '.find-term-all-button', () => push({
      target: target.MODEL,
      type: actionType.FIND_TERM
    }))

    container.on('click', '.delete-all-button', () => {
      for (let n of component.ractive.get('texts')) {
        push({
          target: target.MODEL_NODE,
          type: actionType.DELETE,
          id: n.id
        })
      }
    })

    // texts
    container.on('change', '.focus input', (e) => pushTextId(e, component, actionType.FOCUS, push))
    component.ractive.observe(
      'texts.*.text',
      debounce((newValue, oldValue, keypath, index) => updateText(component, index, push), 10)
    )
    container.on('keyup', '.text input', (e) => {
      if (e.key === 'Enter' && e.target.value) {
        pushTextId(e, component, actionType.FIND_TERM, push)
      }
    })
    container.on('click', '.text .find-term-button', (e) => pushTextId(e, component, actionType.FIND_TERM, push))
    container.on('click', '.text .delete-button', (e) => pushTextId(e, component, actionType.DELETE, push))

    // term
    component.ractive.observe(
      'texts.*.terms.*.enable texts.*.terms.*.value',
      debounce((newValue, oldValue, keypath, textIndex) => updateTerm(component, textIndex, push), 200)
    )
    container.on('click', '.term .delete-button', (e) => delTermButtonClick(e, component, push))
    container.on('mouseover', '.term .delete-button', (e) => pushTermId(e, component, actionType.HOVER_TERM, push))
    container.on('mouseout', '.term .delete-button', (e) => pushTermId(e, component, actionType.UNHOVER_TERM, push))

    // Do not use input.term to prevent event form existing terms.
    container.on('keyup', '.terms .add input', (e) => {
      if (e.key === 'Enter' && e.target.value) {
        addTerm(component, e.target, push)
      }
    })
    container.on('click', '.terms .add-button', (e) => addTermButtonClick(e, component, push))

    // rows
    container.on('mouseover', 'tr', (e) => pushTextId(e, component, actionType.HOVER, push))
    container.on('mouseout', 'tr', (e) => pushTextId(e, component, actionType.UNHOVER, push))
  }
}

function updateText(component, index, push) {
  if (component.has(index)) {
    let text = component.getTextValue(index)

    push({
      target: target.MODEL_NODE,
      type: actionType.UPDATE_TEXT,
      id: text.id,
      text: text.text
    })
  }
}

function updateTerm(component, index, push) {
  if (component.has(index)) {
    let text = component.getTextValue(index)

    pushUpdateTerm(push, text.id, text.terms)
  }
}

function delTermButtonClick(e, component, push) {
  let button = getButton(e.target),
    textIndex = component.getTextIndex(button),
    termIndex = component.getTermIndex(button),
    text = component.getTextValue(textIndex),
    newTerms = text.terms.filter((e, index) => index !== termIndex)

  pushUpdateTerm(push, text.id, newTerms)
}

function addTermButtonClick(e, component, push) {
  let button = getButton(e.target),
    input = button.previousElementSibling

  addTerm(component, input, push)
}

function addTerm(component, input, push) {
  let newValue = input.value

  if (newValue) {
    let index = component.getTextIndex(input),
      text = component.getTextValue(index)

    pushUpdateTerm(push, text.id, text.terms.concat({
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
  let textId = component.getTextId(event.target),
    termIndex = component.getTermIndex(event.target)

  // A terimIndex may be 0.
  if (textId && termIndex !== null) {
    push({
      target: target.VIEW_NODE,
      type,
      id: textId,
      index: termIndex
    })
  }
}

function pushTextId(event, component, type, push) {
  let textId = component.getTextId(event.target)

  if (textId) {
    push({
      target: target.MODEL_NODE,
      type,
      id: textId
    })
  }
}
