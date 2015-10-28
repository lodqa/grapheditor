import debounce from 'debounce'
import delegate from 'dom-delegate'
import {
  ActionReadable
}
from 'action-stream'
import nodeTableComponent from '../../../view/table/nodeTableComponent'
import {
  actionType, target
}
from '../../const'
import Term from './Term'

export default class extends ActionReadable {
  constructor(selector) {
    super(selector)
    this.name = 'NodeTableActionStream'
  }
  _bindComponent(selector, push) {
    let component = nodeTableComponent(selector),
      container = delegate(component.component),
      term = new Term(component, target.MODEL_NODE, target.VIEW_NODE, push)

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
      debounce(term.updateHandler, 200)
    )
    container.on('click', '.term .delete-button', term.deleteButtonHandler)
    container.on('mouseover', '.term .delete-button', term.hoverHandeler)
    container.on('mouseout', '.term .delete-button', term.unhovkrHandeler)

    // Do not use input.term to prevent event form existing terms.
    container.on('keyup', '.terms .add input', term.keyupHandler)
    container.on('click', '.terms .add-button', term.addButtonHandler)

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
