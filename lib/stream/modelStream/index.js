import DataModelStream from './DataModelStream'
import nodes from '../../model/nodes'
import edges from '../../model/edges'

export default function() {
  return new DataModelStream(nodes(), edges())
}
