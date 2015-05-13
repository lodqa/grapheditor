import {
  Transform
}
from 'stream'

import option from '../defaultOption'
import extend from 'xtend'
import nodes from './nodes'

class ModelStream extends Transform {
  constructor(nodes) {
    super(option)
    this._nodes = nodes
  }
  _transform(action, encoding, done) {
    if (action.target === 'node') {
      if (!this._nodes.add(action)) {
        this.push(
          extend(
            action, {
              target: 'view',
              type: 'duplicate'
            }
          )
        )
        done()
        return
      }
    }

    this.push(action)
    done()
  }
}

export default new ModelStream(nodes())
