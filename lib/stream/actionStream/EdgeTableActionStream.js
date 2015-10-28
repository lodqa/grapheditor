import debounce from 'debounce'
import delegate from 'dom-delegate'
import {
  ActionReadable
}
from 'action-stream'
import edgeTableComponent from '../../view/table/edgeTableComponent'
import {
  actionType, target
}
from '../const'

export default class extends ActionReadable {
  constructor(selector) {
    super(selector)
    this.name = 'EdgeTableActionStream'
  }
  _bindComponent(selector, push) {
    let component = edgeTableComponent(selector),
      container = delegate(component.component)

    // texts
    component.ractive.observe(
      'texts.*.text',
      debounce((newValue, oldValue, keypath, index) => updateText(component, index, push), 10)
    )
    container.on('keyup', '.text input', (e) => {
      if (e.key === 'Enter' && e.target.value) {
        pushTextId(e, component, target.MODEL_EDGE, actionType.FIND_TERM, push)
      }
    })
    container.on('click', '.text .find-term-button', (e) => pushTextId(e, component, target.MODEL_EDGE, actionType.FIND_TERM, push))
    container.on('click', '.text .delete-button', (e) => pushTextId(e, component, target.VIEW_EDGE, actionType.DELETE, push))

    // term
    component.ractive.observe(
      'texts.*.terms.*.enable texts.*.terms.*.value',
      debounce((newValue, oldValue, keypath, textIndex) => updateTerm(component, textIndex, push), 200)
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
    container.on('mouseover', 'tr', (e) => pushTextId(e, component, target.MODEL_EDGE, actionType.HOVER, push))
    container.on('mouseout', 'tr', (e) => pushTextId(e, component, target.MODEL_EDGE, actionType.UNHOVER, push))
  }
}

function updateText(component, index, push) {
  if (component.has(index)) {
    let textValue = component.getTextValue(index),
      text = textValue.text

    if (textValue.text === '*') {
      text = ''
    }

    // Id is for the model, sourceId and targetId are for the graph.
    push({
      target: target.MODEL_EDGE,
      type: actionType.UPDATE_TEXT,
      id: textValue.id,
      sourceId: textValue.sourceId,
      targetId: textValue.targetId,
      text
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
    target: target.MODEL_EDGE,
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
  let action = getAciton(component, event, target.VIEW_EDGE, type),
    termIndex = component.getTermIndex(event.target)

  // A terimIndex may be 0.
  if (action && termIndex !== null) {
    action.index = termIndex
    push(action)
  }
}

function pushTextId(event, component, target, type, push) {
  let action = getAciton(component, event, target, type)

  if (action) {
    push(action)
  }
}

function getAciton(component, event, target, type) {
  let [id, sourceId, targetId] = component.getTextId(event.target)

  if (!id || !sourceId || !targetId) {
    return null
  }

  return {
    target,
    type,
    id,
    sourceId,
    targetId
  }
}
