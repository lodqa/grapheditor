import actionStream from './lib/stream/actionStream'
import ModelStream from './lib/stream/ModelStream'
import GraphViewStream from './lib/stream/GraphViewStream'
import InputNodeViewStream from './lib/stream/InputNodeViewStream'
import inputNodeComponent from './lib/component/inputNodeComponent'
import graphComponent from './lib/component/graphComponent'

let inputNode = inputNodeComponent('#input-node'),
  graph = graphComponent('#jsPlumb-container')

actionStream
  .pipe(new ModelStream)
  .pipe(new GraphViewStream(graph))
  .pipe(new InputNodeViewStream(inputNode))
