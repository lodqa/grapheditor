import inputNodeComponent from '../../component/inputNodeComponent'
import graphComponent from '../../component/graphComponent'
import InputNodeActionStream from './InputNodeActionStream'
import EdgeActionStream from './EdgeActionStream'
import FunnelStream from './FunnelStream'

let inputNode = inputNodeComponent('#input-node'),
  graph = graphComponent('#jsPlumb-container'),
  funnel = new FunnelStream()

new InputNodeActionStream(inputNode)
  .pipe(funnel)

new EdgeActionStream(graph)
  .pipe(funnel)

export default funnel
