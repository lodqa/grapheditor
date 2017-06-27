import {
  TailStream
}
from 'action-stream'
import {
  selector
}
from '../const'
import {
  LayoutStream,
  EdgeRenderStream,
  NodeRenderStream
} from './graph'
import {
  NodeTableRenderStream,
  EdgeTableRenderStream,
  PlaceholderRenderStream,
  TableMessageRenderStream
} from './table'
import PgpRenderStream from './PgpRenderStream'
import MappingsRenderStream from './MappingsRenderStream'

export default function() {
  const stream = new NodeRenderStream(selector.GRPAPH)
  const tailStream = new TailStream(false)

  stream
    .pipe(new EdgeRenderStream(selector.GRPAPH))
    .pipe(new PlaceholderRenderStream(selector.TABLE))
    .pipe(new NodeTableRenderStream(selector.NODE_TABLE))
    .pipe(new EdgeTableRenderStream(selector.EDGE_TABLE))
    .pipe(new TableMessageRenderStream(selector.TABLE))
    .pipe(new PgpRenderStream(selector.PGP))
    .pipe(new MappingsRenderStream(selector.MAPPINGS))
    .pipe(new LayoutStream())
    .pipe(tailStream)

  return stream
}
