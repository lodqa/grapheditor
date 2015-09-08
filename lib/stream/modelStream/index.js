import duplex from 'duplexer'
import SelectionModelStream from './SelectionModelStream'
import DataModelLookupStream from './DataModelLookupStream'
import DataModelNodeStream from './DataModelNodeStream'
import DataModelEdgeStream from './DataModelEdgeStream'
import DataModelAssociatedEdgeStream from './DataModelAssociatedEdgeStream'
import DataModelAssociatedNodeStream from './DataModelAssociatedNodeStream'
import nodes from '../../model/nodes'
import edges from '../../model/edges'

export default function(lookupUrl, dictionaryUrl) {
  let nodeModel = nodes(),
    edgeModel = edges(),
    headStream = new SelectionModelStream(),
    tailStream = headStream
    .pipe(new DataModelNodeStream(nodeModel))
    .pipe(new DataModelLookupStream(nodeModel, edgeModel, lookupUrl, dictionaryUrl))
    .pipe(new DataModelAssociatedNodeStream(nodeModel))
    .pipe(new DataModelEdgeStream(edgeModel))
    .pipe(new DataModelAssociatedEdgeStream(edgeModel))

  return duplex(headStream, tailStream)
}
