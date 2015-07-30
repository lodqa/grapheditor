import delegate from 'dom-delegate'
import {
  ActionReadable
}
from 'action-stream'
import {
  actionType, target
}
from '../const'
import graphComponent from '../../view/graphComponent'

export default class extends ActionReadable {
  constructor(selector) {
    super(selector)
    this.name = 'NodeActionStream'
  }
  _bindComponent(selector, push) {
    let component = graphComponent(selector),
      container = delegate(component.container)

    container.on('click', '.node', e => {
      if (e.target.className === 'sourcePoint')
        return

      push({
        target: target.VIEW_NODE,
        type: actionType.SELECT,
        id: e.target.id
      })
    })

    container.on('mouseover', '.node', e => {
      push({
        target: target.MODEL_NODE,
        type: actionType.HOVER,
        id: getIdWithSourcePoint(e.target)
      })
    })

    container.on('mouseout', '.node', e => {
      push({
        target: target.MODEL_NODE,
        type: actionType.UNHOVER,
        id: getIdWithSourcePoint(e.target)
      })
    })

    component.emitter
      .on('dragging', e => push(
        Object.assign({
          target: target.LAYOUT_NODE,
          type: actionType.DRAG
        }, e)
      ))
  }
}

function getIdWithSourcePoint(el) {
  let id

  if (el.className === 'sourcePoint') {
    id = el.parentNode.id
  } else {
    id = el.id
  }

  return id
}
