import {
  ActionReadable
}
from 'action-stream'
import {
  actionType,
  target
}
from '../const'

// jsPlumb suppress exceptions.
export default class extends ActionReadable {
  constructor() {
    super()
    this.name = 'KeyboardActionStream'
  }
  _bindComponent(selector, push) {
    document.addEventListener('keyup', (e) => {
      // Ignore events on input elements, for example an input element in an editing node.
      if (e.target.type === 'text') {
        return
      }

      switch (e.key) {
      case 'Escape':
        push({
          target: target.MODEL,
          type: actionType.UNSELECT
        })
        break
      case 'Delete':
        push({
          target: target.MODEL,
          type: actionType.DELETE
        })
        break
      default:
      }
    })
  }
}
