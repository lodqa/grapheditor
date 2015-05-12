import {
  Transform
}
from 'stream'

import option from './defaultOption'
import extend from 'xtend'

export default class ModelStream extends Transform {
  constructor() {
    super(option)
    this._nodes = new Map()
  }
  _transform(action, encoding, done) {
    if (action.type === 'node') {
      if (!this._validateNode(action)) {
        this.push(
          extend(
            action, {
              type: 'view',
              action: 'duplicate'
            }
          )
        )
        done()
        return
      }

      action.id = `node${Date.now()}`
      this._nodes.set(action.url, action)
    }

    this.push(action)
    done()
  }
  _validateNode(action) {
    return action.url && !this._nodes.has(action.url)
  }
}
