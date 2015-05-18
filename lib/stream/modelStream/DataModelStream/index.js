import ActionTransform from '../../ActionTransform'

import handleNode from './handleNode'
import handleEdge from './handleEdge'

export default class DataModelStream extends ActionTransform {
  constructor(nodes, edges) {
    super()
    this._nodes = nodes
    this._edges = edges
  }
  _transformAction(action, push) {
    if (action.target === 'node') {
      handleNode(this._nodes, action, push)
    }

    if (action.target === 'edge') {
      handleEdge(this._edges, this._nodes, action, push)
    }
  }
}
