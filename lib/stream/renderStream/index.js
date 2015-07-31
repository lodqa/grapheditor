import {
  TailStream
}
from 'action-stream'
import {
  selector
}
from '../const'
import LayoutStream from './LayoutStream'
import EdgeRenderStream from './EdgeRenderStream'
import NodeRenderStream from './NodeRenderStream'
import nodeEditorStream from './nodeEditorStream'
import NodeTableRenderStream from './NodeTableRenderStream'
import PgpRenderStream from './PgpRenderStream'
import MappingsRenderStream from './MappingsRenderStream'

export default function() {
  let stream = nodeEditorStream(),
    tailStream = new TailStream(false)

  stream
    .pipe(new NodeRenderStream(selector.GRPAPH))
    .pipe(new EdgeRenderStream(selector.GRPAPH))
    .pipe(new NodeTableRenderStream(selector.NODE_TABLE))
    .pipe(new PgpRenderStream(selector.PGP))
    .pipe(new MappingsRenderStream(selector.MAPPINGS))
    .pipe(new LayoutStream())
    .pipe(tailStream)

  return stream
}
