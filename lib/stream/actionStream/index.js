import inputNodeComponent from '../../view/inputNodeComponent'
import graphComponent from '../../view/graphComponent'
import InputNodeActionStream from './InputNodeActionStream'
import EdgeActionStream from './EdgeActionStream'
import NodeActionStream from './NodeActionStream'
import DebugLogStream from '../DebugLogStream'

let inputNode = inputNodeComponent('.input-node'),
  graph = graphComponent('#jsPlumb-container'),
  funnel = new DebugLogStream('FunnelStream')

new InputNodeActionStream(inputNode).pipe(funnel)
new EdgeActionStream(graph).pipe(funnel)
new NodeActionStream(graph).pipe(funnel)

export default funnel
