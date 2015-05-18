import selector from '../selector'
import DebugLogStream from '../DebugLogStream'
import InputNodeRenderStream from './InputNodeRenderStream'
import EditNodeRenderStream from './EditNodeRenderStream'
import MessageRenderStream from './MessageRenderStream'
import NodeRenderStream from './NodeRenderStream'
import EdgeRenderStream from './EdgeRenderStream'

let stream = new EdgeRenderStream(selector.GRPAPH),
  tailStream = new DebugLogStream('TailStream')

stream
  .pipe(new NodeRenderStream(selector.GRPAPH))
  .pipe(new InputNodeRenderStream(selector.INPUT_NODE))
  .pipe(new EditNodeRenderStream(selector.EDIT_NODE))
  .pipe(new MessageRenderStream(selector.MESSAGE))
  .pipe(tailStream)

export default stream
