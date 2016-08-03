import {
  actionType
}
from '../../const'
import pushUpdateTerm from './pushUpdateTerm'
import getButton from './getButton'

export default function(component, model, view, push) {
  return {
    keyupHandler: (e) => {
      if (e.key === 'Enter' && e.target.value) {
        add(component, e.target, model, push)
      }
    },
    addButtonHandler: (e) => addTermButtonClick(e, component, model, push),
    updateHandler: (newValue, oldValue, keypath, textIndex) => updateTerm(component, textIndex, model, push),
    deleteButtonHandler: (e) => delTermButtonClick(e, component, model, push),
    hoverHandeler: (e) => pushTermId(e, component, view, actionType.HOVER_TERM, push),
    unhovkrHandeler: (e) => pushTermId(e, component, view, actionType.UNHOVER_TERM, push)
  }
}

function addTermButtonClick(e, component, target, push) {
  let button = getButton(e.target),
    input = button.previousElementSibling

  add(component, input, target, push)
}

function add(component, input, target, push) {
  let newValue = input.value

  if (newValue) {
    let index = component.getTextIndex(input),
      text = component.getTextValue(index)

    pushUpdateTerm(target, text.id, text.terms.concat({
      enable: true,
      url: newValue
    }), push)

    input.value = ''
  }
}

function updateTerm(component, index, target, push) {
  if (component.has(index)) {
    let text = component.getTextValue(index)

    pushUpdateTerm(target, text.id, text.terms, push)
  }
}

function delTermButtonClick(e, component, target, push) {
  let button = getButton(e.target),
    textIndex = component.getTextIndex(button),
    termIndex = component.getTermIndex(button),
    text = component.getTextValue(textIndex),
    newTerms = text.terms.filter((e, index) => index !== termIndex)

  pushUpdateTerm(target, text.id, newTerms, push)
}

function pushTermId(event, component, target, type, push) {
  let textId = component.getTextId(event.target),
    termIndex = component.getTermIndex(event.target)

  // A terimIndex may be 0.
  if (textId && termIndex !== null) {
    push({
      target,
      type,
      id: textId,
      index: termIndex
    })
  }
}
