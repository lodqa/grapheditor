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
    this._edges = new Map()
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

    if (action.target === 'edge') {
      if (action.type === 'afterAdd') {
        let sourceURL = this._nodes.get(action.sourceId),
          targetURL = this._nodes.get(action.targetId)

        this._edges.set(`${sourceURL}|${targetURL}`, {
          label: action.label,
          url: ''
        })

        console.log('add edge', this._edges);
      }
    }

    this.push(action)
    done()
  }
}

export default new ModelStream(nodes())
