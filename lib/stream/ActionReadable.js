import {
  Readable
}
from 'stream'
import option from './defaultOption';

export default class extends Readable {
  constructor(selector) {
    super(option)
    this._bindComponent(selector, (action) => {
      console.assert(this.name, '"Steram" MUST has the name property when push an "action".')

      action.source = [this.name]
      this.push(action)
    })
  }
  _bindComponent(selector, push) {}
  _read() {}
}
