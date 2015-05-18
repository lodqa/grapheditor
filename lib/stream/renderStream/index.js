import inputNodeComponent from '../../view/inputNodeComponent'
import editNodeComponent from '../../view/editNodeComponent'
import messageComponent from '../../view/messageComponent'
import graphComponent from '../../view/graphComponent'
import DebugLogStream from '../DebugLogStream'
import InputNodeRenderStream from './InputNodeRenderStream'
import EditNodeRenderStream from './EditNodeRenderStream'
import MessageRenderStream from './MessageRenderStream'
import NodeRenderStream from './NodeRenderStream'
import EdgeRenderStream from './EdgeRenderStream'

let inputNode = inputNodeComponent('.input-node'),
  editNode = editNodeComponent('.edit-node'),
  message = messageComponent('.node-editor'),
  graph = graphComponent('#jsPlumb-container'),
  stream = new EdgeRenderStream(graph),
  tailStream = new DebugLogStream('TailStream')

stream
  .pipe(new NodeRenderStream(graph))
  .pipe(new InputNodeRenderStream(inputNode))
  .pipe(new EditNodeRenderStream(editNode))
  .pipe(new MessageRenderStream(message))
  .pipe(tailStream)

export default stream
