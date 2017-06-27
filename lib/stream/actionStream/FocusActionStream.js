import {
  ActionReadable
}
from 'action-stream'
import {
  actionType, target
}
from '../const'

// Unselect nodes when elements outside the graph get focus.
// Prevent deletion of node responding to key event on input elements outside the graph.
export default class extends ActionReadable {
  constructor() {
    super()
    this.name = 'FocusActionStream'
  }
  _bindComponent(selector, push) {
    document.body.addEventListener('focus', (e) => {
      if (!e.target.closest('.jsPlumb-container')) {
        push({
          target: target.MODEL,
          type: actionType.UNSELECT
        })
      }
    }, true)
  }
}
