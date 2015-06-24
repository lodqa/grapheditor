import {
  ActionTransform
}
from 'action-stream'
import {
  target
}
from '../../const'
import handleNode from './handleNode'
import handleEdge from './handleEdge'
import handleAssociatedEdge from './handleAssociatedEdge'
import handleAssociatedNode from './handleAssociatedNode'

export default class extends ActionTransform {
  constructor(nodes, edges) {
    super()
    this.name = 'DataModelStream'
    this._nodes = nodes
    this._edges = edges
  }
  _transformAction(action, push) {
    if (action.target === target.MODEL_NODE) {
      handleNode(this._nodes, action, push)
      handleAssociatedEdge(this._edges, this._nodes, action, push)
    }

    if (action.target === target.MODEL_EDGE) {
      handleEdge(this._edges, this._nodes, action, push)
      handleAssociatedNode(this._nodes, action, push)
    }
  }
}
