import {
  selector
}
from '../const'
import TapLogStream from '../TapLogStream'
import UnselectRenderStream from './UnselectRenderStream'
import EdgeRenderStream from './EdgeRenderStream'
import NodeRenderStream from './NodeRenderStream'
import MessageRenderStream from './MessageRenderStream'
import nodeEditorStream from './nodeEditorStream'
import NodeTableRenderStream from './NodeTableRenderStream'
import EdgeTableRenderStream from './EdgeTableRenderStream'

let stream = new UnselectRenderStream(),
  tailStream = new TapLogStream('TailStream')

stream
  .pipe(new EdgeRenderStream(selector.GRPAPH))
  .pipe(new NodeRenderStream(selector.GRPAPH))
  .pipe(new MessageRenderStream(selector.MESSAGE))
  .pipe(nodeEditorStream)
  .pipe(new NodeTableRenderStream(selector.NODE_TABLE))
  .pipe(new EdgeTableRenderStream(selector.EDGE_TABLE))
  .pipe(tailStream)

export default stream
