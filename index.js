import actionStream from './lib/stream/actionStream'
import modelStream from './lib/stream/modelStream'
import viewStream from './lib/stream/viewStream'

actionStream
  .pipe(modelStream)
  .pipe(viewStream)
