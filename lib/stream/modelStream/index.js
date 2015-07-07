import DataModelStream from './DataModelStream'
import nodes from '../../model/nodes'
import edges from '../../model/edges'

export default function(lookupUrl) {
  return new DataModelStream(nodes(), edges(), lookupUrl)
}
