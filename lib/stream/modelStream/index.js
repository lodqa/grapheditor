import duplex from 'duplexer'
import SelectionModelStream from './SelectionModelStream'
import DataModelStream from './DataModelStream'
import nodes from '../../model/nodes'
import edges from '../../model/edges'

export default function(lookupUrl) {
  let headStream = new SelectionModelStream(),
    tailStream = headStream.pipe(new DataModelStream(nodes(), edges(), lookupUrl))

  return duplex(headStream, tailStream)
}
