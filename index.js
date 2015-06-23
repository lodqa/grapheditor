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
  source: ['index.js'],
  target: target.MODEL_NODE,
  type: actionType.CREATE,
  label: 'google',
  url: 'http://google.com'
})

actionStream.push({
  source: ['index.js'],
  target: target.MODEL_NODE,
  type: actionType.CREATE,
  label: 'yahoo',
  url: 'http://yahoo.com'
})

actionStream.push({
  source: ['index.js'],
  target: target.MODEL_NODE,
  type: actionType.CREATE,
  label: 'bing',
  url: 'http://bing.com'
})

actionStream.push({
  source: ['index.js'],
  target: target.MODEL_NODE,
  type: actionType.CREATE,
  label: 'bang',
  url: 'http://bang.com'
})

actionStream.push({
  source: ['index.js'],
  target: target.MODEL_NODE,
  type: actionType.CREATE,
  label: 'bong',
  url: 'http://bong.com'
})

actionStream.push({
  source: ['index.js'],
  target: target.MODEL_NODE,
  type: actionType.CREATE,
  label: 'song',
  url: 'http://song.com'
})

actionStream.push({
  source: ['index.js'],
  target: target.MODEL_EDGE,
  type: actionType.CREATE,
  edges: [{
    sourceUrl: 'http://google.com',
    targetUrl: 'http://yahoo.com',
    label: 'path1',
    url: 'http://github.com/path1'
  }, {
    sourceUrl: 'http://google.com',
    targetUrl: 'http://bing.com',
    label: 'path2',
    url: 'http://path2.com'
  }, {
    sourceUrl: 'http://google.com',
    targetUrl: 'http://bang.com',
    label: 'path3',
    url: 'http://path3.com'
  }, {
    sourceUrl: 'http://google.com',
    targetUrl: 'http://bong.com',
    label: 'path4',
    url: 'http://path4.com'
  }, {
    sourceUrl: 'http://bing.com',
    targetUrl: 'http://song.com',
    label: 'path5',
    url: 'http://path5.com'
  }]
})
