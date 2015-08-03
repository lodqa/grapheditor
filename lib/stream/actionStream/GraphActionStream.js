import {
  ActionReadable
}
from 'action-stream'
import graphComponent from '../../view/graphComponent'
import {
  actionType, target
}
from '../const'

// jsPlumb suppress exceptions.
export default class extends ActionReadable {
  constructor(selector) {
    super(selector)
    this.name = 'GraphActionStream'
  }
  _bindComponent(selector, push) {
    let component = graphComponent(selector)

    component.container.addEventListener('click', e => {
      if (e.currentTarget !== e.target)
        return;

      push({
        target: target.MODEL_NODE,
        type: actionType.UNSELECT
      })

      push({
        target: target.MODEL_EDGE,
        type: actionType.UNSELECT
      })
    })
  }
}
