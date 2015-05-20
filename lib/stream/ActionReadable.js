import {
  Readable
}
from 'stream'
import option from './defaultOption';

export default class extends Readable {
  constructor() {
    super(option)
  }
  _read() {}
}
