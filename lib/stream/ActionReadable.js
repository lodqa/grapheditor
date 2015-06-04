import {
  Readable
}
from 'stream'
import option from './defaultOption';

export default class extends Readable {
  constructor(selector) {
    super(option)
    this._bindComponent(selector, (action) => {
      if (this.name)
        action.source = [this.name]
      this.push(action)
    })
  }
  _bindComponent(selector, push) {}
  _read() {}
}
