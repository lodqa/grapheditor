import selector from '../selector'
import DebugLogStream from '../DebugLogStream'
import EdgeRenderStream from './EdgeRenderStream'
import NodeRenderStream from './NodeRenderStream'
import MessageRenderStream from './MessageRenderStream'
import nodeEditorStream from './nodeEditorStream'

let stream = new EdgeRenderStream(selector.GRPAPH),
  tailStream = new DebugLogStream('TailStream')

stream
  .pipe(new NodeRenderStream(selector.GRPAPH))
  .pipe(new MessageRenderStream(selector.MESSAGE))
  .pipe(nodeEditorStream)
  .pipe(tailStream)

export default stream
