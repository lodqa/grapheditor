import duplex from 'duplexer'
import {
  selector
}
from '../../const'
import ModeRenderStream from './ModeRenderStream'
import InputNodeRenderStream from './InputNodeRenderStream'
import EditEdgeRenderStream from './EditEdgeRenderStream'


export default function() {
  let headStream = new ModeRenderStream(selector.INPUT_NODE, selector.EDIT_EDGE),
    tailStream = headStream.pipe(new InputNodeRenderStream(selector.INPUT_NODE))
    .pipe(new EditEdgeRenderStream(selector.EDIT_EDGE))

  return duplex(headStream, tailStream)
}
