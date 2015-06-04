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

    this.push(chunk)
    if (results.length > 0) {
      console.assert(this.name, '"Steram" MUST has the name property when push another "action".')

      results.forEach(r => {
        r.source = chunk.source.concat([this.name])
        this.push(extend(chunk, r))
      })
    }

    callback()
  }
  _transformAction(action, push) {
    throw new Error('not implemented');
  }
}
