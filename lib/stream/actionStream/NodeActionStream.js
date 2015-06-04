import delegate from 'dom-delegate'
import ActionReadable from '../ActionReadable'
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
  }
}
