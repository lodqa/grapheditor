import GraphViewStream from './GraphViewStream'
import InputNodeViewStream from './InputNodeViewStream'
import inputNodeComponent from '../../view/inputNodeComponent'
import graphComponent from '../../view/graphComponent'

let inputNode = inputNodeComponent('#input-node'),
  graph = graphComponent('#jsPlumb-container'),
  viewStream = new GraphViewStream(graph)

viewStream.pipe(new InputNodeViewStream(inputNode))

export default viewStream
