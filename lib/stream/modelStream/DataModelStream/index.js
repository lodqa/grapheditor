import {
  Transform
}
from 'stream'

import option from '../../defaultOption'
import handleNode from './handleNode'
import handleEdge from './handleEdge'

export default class DataModelStream extends Transform {
  constructor(nodes, edges) {
    super(option)
    this._nodes = nodes
    this._edges = edges
  }
  _transform(action, encoding, done) {
    if (action.target === 'node') {
      handleNode(this._nodes, action, this)
    } else if (action.target === 'edge') {
      handleEdge(this._edges, this._nodes, action, this)
    } else {
      this.push(action)
    }

    done()
  }
}
