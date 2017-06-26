import global from 'global'
import {
  ActionReadable
}
from 'action-stream'
import {
  actionType, target
}
from '../const'

export default class extends ActionReadable {
  constructor(selector) {
    super(selector)
    this.name = 'AddEmptyNodeActionStream'
  }
  _bindComponent(selector, push) {
    global.document.querySelector(selector).addEventListener('click', () => {
      push({
        target: target.MODEL_NODE,
        type: actionType.CREATE
      })
    })
  }
}
