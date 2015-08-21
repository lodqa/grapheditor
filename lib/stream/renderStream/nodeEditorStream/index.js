import duplex from 'duplexer'
import {
  selector
}
from '../../const'
import MessageRenderStream from './MessageRenderStream'
import ModeRenderStream from './ModeRenderStream'
import InputNodeRenderStream from './InputNodeRenderStream'

export default function() {
  let headStream = new MessageRenderStream(selector.MESSAGE),
    tailStream = headStream
    .pipe(new ModeRenderStream(selector.INPUT_NODE, selector.EDIT_EDGE))
    .pipe(new InputNodeRenderStream(selector.INPUT_NODE))

  return duplex(headStream, tailStream)
}
