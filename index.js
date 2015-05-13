import actionStream from './lib/stream/actionStream'
import ModelStream from './lib/stream/ModelStream'
import viewStream from './lib/stream/viewStream'

actionStream
  .pipe(new ModelStream)
  .pipe(viewStream)
