import {
  Transform
}
from 'stream'

import option from './defaultOption'
import extend from 'xtend'

class ModelStream extends Transform {
  constructor(nodes) {
    super(option)
    this._nodes = nodes
  }
  _transform(action, encoding, done) {
    if (action.target === 'node') {
      if (!this._nodes.validate(action)) {
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

      this._nodes.add(action)
    }

    this.push(action)
    done()
  }
}

let nodes = function() {
  let nodes = new Map()

  return {
    nodes: nodes,
    add: (action) => {
      action.id = `node${Date.now()}`
      nodes.set(action.url, action)
    },
    validate: (action) => action.url && !nodes.has(action.url)
  }
}()

export default new ModelStream(nodes)
