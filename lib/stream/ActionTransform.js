import {
  Transform
}
from 'stream'
import extend from 'xtend'
import option from './defaultOption';

export default class extends Transform {
  constructor() {
    super(option)
  }
  _transform(chunk, encoding, callback) {
    console.assert(Array.isArray(chunk.source), '"aciton" MUST has the source property as array.')

    let results = []
    this._transformAction(chunk, results.push.bind(results))

    if (!this.push(chunk))
      throw new Error('The stream is clogged.')

    if (results.length > 0) {
      console.assert(this.name, '"Steram" MUST has the name property when push another "action".')

      results.forEach(r => {
        r.source = chunk.source.concat([this.name])
        if (!this.push(extend(chunk, r)))
          throw new Error('The stream is clogged.')
      })
    }

    callback()
  }
  _transformAction(action, push) {
    throw new Error('not implemented');
  }
}
