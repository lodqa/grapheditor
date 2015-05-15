import EdgeRenderStream from './EdgeRenderStream'
import NodeRenderStream from './NodeRenderStream'
import InputNodeRenderStream from './InputNodeRenderStream'
import inputNodeComponent from '../../view/inputNodeComponent'
import graphComponent from '../../view/graphComponent'

let inputNode = inputNodeComponent('#input-node'),
  graph = graphComponent('#jsPlumb-container'),
  stream = new EdgeRenderStream(graph)

stream
  .pipe(new NodeRenderStream(graph))
  .pipe(new InputNodeRenderStream(inputNode))

export default stream
