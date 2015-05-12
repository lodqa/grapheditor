import InputNodeControllerStream from './lib/stream/InputNodeControllerStream'
import GraphControllerStream from './lib/stream/GraphControllerStream'
import FunnelStream from './lib/stream/FunnelStream'
import ModelStream from './lib/stream/ModelStream'
import GraphViewStream from './lib/stream/GraphViewStream'
import InputNodeViewStream from './lib/stream/InputNodeViewStream'
import inputNodeComponent from './lib/component/inputNodeComponent'
import graphComponent from './lib/component/graphComponent'

let funnel = new FunnelStream(),
  inputNode = inputNodeComponent('#input-node'),
  graph = graphComponent('#jsPlumb-container')

new InputNodeControllerStream(inputNode)
  .pipe(funnel)

new GraphControllerStream(graph)
  .pipe(funnel)

funnel
  .pipe(new ModelStream)
  .pipe(new GraphViewStream(graph))
  .pipe(new InputNodeViewStream(inputNode))
