import {
  selector
}
from '../const'
import ConsoleDebugStream from '../ConsoleDebugStream'
import UnselectRenderStream from './UnselectRenderStream'
import EdgeRenderStream from './EdgeRenderStream'
import NodeRenderStream from './NodeRenderStream'
import MessageRenderStream from './MessageRenderStream'
import nodeEditorStream from './nodeEditorStream'
import NodeTableRenderStream from './NodeTableRenderStream'
import EdgeTableRenderStream from './EdgeTableRenderStream'

let stream = new UnselectRenderStream(),
  tailStream = new ConsoleDebugStream('TailStream')

stream
  .pipe(new EdgeRenderStream(selector.GRPAPH))
  .pipe(new NodeRenderStream(selector.GRPAPH))
  .pipe(new MessageRenderStream(selector.MESSAGE))
  .pipe(nodeEditorStream)
  .pipe(new NodeTableRenderStream(selector.NODE_TABLE))
  .pipe(new EdgeTableRenderStream(selector.EDGE_TABLE))
  .pipe(tailStream)

export default stream
