import debounce from 'debounce'
import delegate from 'dom-delegate'
import {
  ActionReadable
}
from 'action-stream'
import edgeTableComponent from '../../../view/table/edgeTableComponent'
import {
  actionType, target
}
from '../../const'
import Term from './Term'

export default class extends ActionReadable {
  constructor(selector) {
    super(selector)
    this.name = 'EdgeTableActionStream'
  }
  _bindComponent(selector, push) {
    const component = edgeTableComponent(selector)
    const container = delegate(component.component)
    const term = new Term(component, target.MODEL_EDGE, target.VIEW_EDGE, push)

    // texts
    component.ractive.observe(
      'texts.*.text',
      debounce((newValue, oldValue, keypath, index) => updateText(component, index, push), 300)
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
      debounce(term.updateHandler, 200)
    )
    container.on('click', '.term .delete-button', term.deleteButtonHandler)
    container.on('mouseover', '.term .delete-button', term.hoverHandeler)
    container.on('mouseout', '.term .delete-button', term.unhovkrHandeler)
    container.on('keyup', '.terms .add input', term.keyupHandler)
    container.on('click', '.terms .add-button', term.addButtonHandler)

    // rows
    container.on('mouseover', 'tr', (e) => pushTextId(e, component, target.MODEL_EDGE, actionType.HOVER, push))
    container.on('mouseout', 'tr', (e) => pushTextId(e, component, target.MODEL_EDGE, actionType.UNHOVER, push))
  }
}

function updateText(component, index, push) {
  if (component.has(index)) {
    const textValue = component.getTextValue(index)

    // Id is for the model, sourceId and targetId are for the graph.
    push({
      target: target.MODEL_EDGE,
      type: actionType.UPDATE_TEXT,
      sourceId: textValue.sourceId,
      targetId: textValue.targetId,
      text: textValue.text
    })
  }
}

function pushTextId(event, component, target, type, push) {
  const action = getAciton(component, event, target, type)

  if (action) {
    push(action)
  }
}

function getAciton(component, event, target, type) {
  const [id, sourceId, targetId] = component.getTextFullId(event.target)

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
