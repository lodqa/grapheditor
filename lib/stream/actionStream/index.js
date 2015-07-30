import {
  FunnelStream
}
from 'action-stream'
import {
  selector
}
from '../const'
import InputNodeActionStream from './InputNodeActionStream'
import EditEdgeActionStream from './EditEdgeActionStream'
import EdgeActionStream from './EdgeActionStream'
import NodeActionStream from './NodeActionStream'
import GraphActionStream from './GraphActionStream'
import LayoutActionStream from './LayoutActionStream'
import NodeTableActionStream from './NodeTableActionStream'

export default function() {
  let funnel = new FunnelStream(false)

  new InputNodeActionStream(selector.INPUT_NODE).pipe(funnel)
  new EditEdgeActionStream(selector.EDIT_EDGE).pipe(funnel)
  new EdgeActionStream(selector.GRPAPH).pipe(funnel)
  new NodeActionStream(selector.GRPAPH).pipe(funnel)
  new GraphActionStream(selector.GRPAPH).pipe(funnel)
  new LayoutActionStream('').pipe(funnel)
  new NodeTableActionStream(selector.NODE_TABLE).pipe(funnel)

  return funnel
}
