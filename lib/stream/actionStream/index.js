import inputNodeComponent from '../../view/inputNodeComponent'
import graphComponent from '../../view/graphComponent'
import InputNodeActionStream from './InputNodeActionStream'
import EdgeActionStream from './EdgeActionStream'
import NodeActionStream from './NodeActionStream'
import FunnelStream from './FunnelStream'

let inputNode = inputNodeComponent('#input-node'),
  graph = graphComponent('#jsPlumb-container'),
  funnel = new FunnelStream()

new InputNodeActionStream(inputNode).pipe(funnel)
new EdgeActionStream(graph).pipe(funnel)
new NodeActionStream(graph).pipe(funnel)

export default funnel
