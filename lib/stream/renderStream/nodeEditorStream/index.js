import duplex from 'duplexer'
import {
  selector
}
from '../../const'
import ModeRenderStream from './ModeRenderStream'
import InputNodeRenderStream from './InputNodeRenderStream'
import EditNodeRenderStream from './EditNodeRenderStream'
import EditEdgeRenderStream from './EditEdgeRenderStream'

let writeStream = new ModeRenderStream(selector.INPUT_NODE, selector.EDIT_NODE, selector.EDIT_EDGE),
  readStream = writeStream.pipe(new InputNodeRenderStream(selector.INPUT_NODE))
  .pipe(new EditNodeRenderStream(selector.EDIT_NODE))
  .pipe(new EditEdgeRenderStream(selector.EDIT_EDGE))

export default duplex(writeStream, readStream)
