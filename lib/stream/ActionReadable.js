import {
  Readable
}
from 'stream'
import option from './defaultOption';

export default class extends Readable {
  constructor(selector) {
    super(option)
    this._bindComponent(selector, this.push.bind(this))
  }
  _bindComponent(selector, push){}
  _read() {}
}
