import actionStream from './lib/stream/actionStream'
import modelStream from './lib/stream/modelStream'
import renderStream from './lib/stream/renderStream'

actionStream
  .pipe(modelStream)
  .pipe(renderStream)
