import polyfill from 'babel/polyfill'

import actionStream from './lib/stream/actionStream'
import modelStream from './lib/stream/modelStream'
import renderStream from './lib/stream/renderStream'
import {
  actionType, target
}
from './lib/stream/const'

actionStream
  .pipe(modelStream)
  .pipe(renderStream)

// Add default nodes to development
actionStream.push({
  target: target.MODEL_NODE,
  type: actionType.CREATE,
  label: 'google',
  url: 'http://google.com'
})

actionStream.push({
  target: target.MODEL_NODE,
  type: actionType.CREATE,
  label: 'yahoo',
  url: 'http://yahoo.com'
})

actionStream.push({
  target: target.MODEL_EDGE,
  type: actionType.CREATE,
  sourceUrl: 'http://google.com',
  targetUrl: 'http://yahoo.com',
  label: 'test',
  url: 'http://github.com'
})
