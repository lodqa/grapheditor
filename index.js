import polyfill from 'babel/polyfill'

import actionStream from './lib/stream/actionStream'
import modelStream from './lib/stream/modelStream'
import renderStream from './lib/stream/renderStream'

actionStream
  .pipe(modelStream)
  .pipe(renderStream)

// Add default nodes to development
actionStream.push({
  target: 'node',
  type: 'create',
  label: 'google',
  url: 'http://google.com'
})

actionStream.push({
  target: 'node',
  type: 'create',
  label: 'yahoo',
  url: 'http://yahoo.com'
})

actionStream.push({
  target: 'edge',
  type: 'create',
  sourceUrl: 'http://google.com',
  targetUrl: 'http://yahoo.com'
})
