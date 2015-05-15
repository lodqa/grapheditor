import EdgeViewStream from './EdgeViewStream'
import NodeViewStream from './NodeViewStream'
import InputNodeViewStream from './InputNodeViewStream'
import inputNodeComponent from '../../view/inputNodeComponent'
import graphComponent from '../../view/graphComponent'

let inputNode = inputNodeComponent('#input-node'),
  graph = graphComponent('#jsPlumb-container'),
  viewStream = new EdgeViewStream(graph)

viewStream
  .pipe(new NodeViewStream(graph))
  .pipe(new InputNodeViewStream(inputNode))

export default viewStream
