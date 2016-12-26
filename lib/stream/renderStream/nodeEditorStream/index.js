import duplex from 'duplexer'
import {
  selector
}
from '../../const'
import MessageRenderStream from './MessageRenderStream'
import InputNodeRenderStream from './InputNodeRenderStream'

export default function() {
  let headStream = new MessageRenderStream(selector.NODE_EDITOR),
    tailStream = headStream
    .pipe(new InputNodeRenderStream(selector.INPUT_NODE))

  return duplex(headStream, tailStream)
}
