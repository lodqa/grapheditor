import global from 'global'
import {
  ActionReadable
}
from 'action-stream'
import {
  actionType, target
}
from '../const'

// jsPlumb suppress exceptions.
export default class extends ActionReadable {
  constructor() {
    super()
    this.name = 'KeyboardActionStream'
  }
  _bindComponent(selector, push) {
    global.document.addEventListener('keyup', e => {
      switch (e.key) {
        case 'Escape':
          push({
            target: target.MODEL_NODE,
            type: actionType.UNSELECT
          })

          push({
            target: target.MODEL_EDGE,
            type: actionType.UNSELECT
          })
          break;
        default:

      }
    })
  }
}
