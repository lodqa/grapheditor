import EdgeRenderStream from './EdgeRenderStream'
import NodeRenderStream from './NodeRenderStream'
import InputNodeRenderStream from './InputNodeRenderStream'
import inputNodeComponent from '../../view/inputNodeComponent'
import graphComponent from '../../view/graphComponent'
import DebugLogStream from '../DebugLogStream'

let inputNode = inputNodeComponent('#input-node'),
  graph = graphComponent('#jsPlumb-container'),
  stream = new EdgeRenderStream(graph),
  tailStream = new DebugLogStream('TailStream')

stream
  .pipe(new NodeRenderStream(graph))
  .pipe(new InputNodeRenderStream(inputNode))
  .pipe(tailStream)

export default stream
