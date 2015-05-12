import inputNodeComponent from '../component/inputNodeComponent'
import graphComponent from '../component/graphComponent'
import InputNodeControllerStream from './InputNodeControllerStream'
import GraphControllerStream from './GraphControllerStream'
import FunnelStream from './FunnelStream'

let inputNode = inputNodeComponent('#input-node'),
  graph = graphComponent('#jsPlumb-container'),
  funnel = new FunnelStream()

new InputNodeControllerStream(inputNode)
  .pipe(funnel)

new GraphControllerStream(graph)
  .pipe(funnel)

export default funnel
