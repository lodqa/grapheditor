import {
  TailStream
}
from 'action-stream'
import {
  selector
}
from '../const'
import UnselectRenderStream from './UnselectRenderStream'
import LayoutStream from './LayoutStream'
import EdgeRenderStream from './EdgeRenderStream'
import NodeRenderStream from './NodeRenderStream'
import MessageRenderStream from './MessageRenderStream'
import nodeEditorStream from './nodeEditorStream'
import NodeTableRenderStream from './NodeTableRenderStream'
import EdgeTableRenderStream from './EdgeTableRenderStream'
import PgpRenderStream from './PgpRenderStream'

export default function() {
  let stream = new UnselectRenderStream(),
    tailStream = new TailStream(true)

  stream
    .pipe(new EdgeRenderStream(selector.GRPAPH))
    .pipe(new NodeRenderStream(selector.GRPAPH))
    .pipe(new MessageRenderStream(selector.MESSAGE))
    .pipe(nodeEditorStream())
    .pipe(new NodeTableRenderStream(selector.NODE_TABLE))
    .pipe(new EdgeTableRenderStream(selector.EDGE_TABLE))
    .pipe(new PgpRenderStream(selector.PGP))
    .pipe(new LayoutStream())
    .pipe(tailStream)

  return stream
}
