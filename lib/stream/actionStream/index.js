import {
  FunnelStream
}
from 'action-stream'
import {
  selector
}
from '../const'
import InputNodeActionStream from './InputNodeActionStream'
import EditNodeActionStream from './EditNodeActionStream'
import EditEdgeActionStream from './EditEdgeActionStream'
import EdgeActionStream from './EdgeActionStream'
import NodeActionStream from './NodeActionStream'

let funnel = new FunnelStream(true)

new InputNodeActionStream(selector.INPUT_NODE).pipe(funnel)
new EditNodeActionStream(selector.EDIT_NODE).pipe(funnel)
new EditEdgeActionStream(selector.EDIT_EDGE).pipe(funnel)
new EdgeActionStream(selector.GRPAPH).pipe(funnel)
new NodeActionStream(selector.GRPAPH).pipe(funnel)

export default funnel
