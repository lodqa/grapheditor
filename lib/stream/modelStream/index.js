import DataModelStream from './DataModelStream'
import nodes from './nodes'
import edges from './edges'

export default new DataModelStream(nodes(), edges())
