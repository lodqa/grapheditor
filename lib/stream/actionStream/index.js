import {
  FunnelStream
}
from 'action-stream'
import {
  selector
}
from '../const'
import AddEmptyNodeActionStream from './AddEmptyNodeActionStream'
import EdgeActionStream from './EdgeActionStream'
import NodeActionStream from './NodeActionStream'
import GraphActionStream from './GraphActionStream'
import LayoutActionStream from './LayoutActionStream'
import NodeTableActionStream from './table/NodeTableActionStream'
import EdgeTableActionStream from './table/EdgeTableActionStream'
import KeyboardActionStream from './KeyboardActionStream'

export default function() {
  const funnel = new FunnelStream(false)

  new AddEmptyNodeActionStream(selector.ADD_EMPTY_NODE).pipe(funnel)
  new EdgeActionStream(selector.GRPAPH).pipe(funnel)
  new NodeActionStream(selector.GRPAPH).pipe(funnel)
  new GraphActionStream(selector.GRPAPH).pipe(funnel)
  new LayoutActionStream().pipe(funnel)
  new NodeTableActionStream(selector.NODE_TABLE).pipe(funnel)
  new EdgeTableActionStream(selector.EDGE_TABLE).pipe(funnel)
  new KeyboardActionStream().pipe(funnel)

  return funnel
}
