import GraphViewStream from './GraphViewStream'
import InputNodeViewStream from './InputNodeViewStream'
import inputNodeComponent from '../component/inputNodeComponent'
import graphComponent from '../component/graphComponent'

let inputNode = inputNodeComponent('#input-node'),
  graph = graphComponent('#jsPlumb-container'),
  viewStream = new GraphViewStream(graph)

viewStream.pipe(new InputNodeViewStream(inputNode))

export default viewStream
