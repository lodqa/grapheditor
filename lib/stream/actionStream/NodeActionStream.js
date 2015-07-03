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
      if (e.target.className === 'endPoint')
        return

      push({
        target: target.MODEL_NODE,
        type: actionType.SELECT,
        id: e.target.id
      })
    })

    container.on('mouseover', '.node', e => {
      push({
        target: target.MODEL_NODE,
        type: actionType.HOVER,
        id: e.target.id
      })
    })

    container.on('mouseout', '.node', e => {
      push({
        target: target.MODEL_NODE,
        type: actionType.UNHOVER,
        id: e.target.id,
        time: new Date()
      })
    })

    component.emitter
      .on('dragging', e => push(
        Object.assign({
          target: target.VIEW_NODE,
          type: actionType.DRAG
        }, e)
      ))
  }
}
