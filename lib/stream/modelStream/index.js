import duplex from 'duplexer'
import SelectionModelStream from './SelectionModelStream'
import DataModelFindTermStream from './DataModelFindTermStream'
import DataModelNodeStream from './DataModelNodeStream'
import DataModelEdgeStream from './DataModelEdgeStream'
import DataModelAssociatedEdgeStream from './DataModelAssociatedEdgeStream'
import DataModelAssociatedNodeStream from './DataModelAssociatedNodeStream'
import Node from '../../model/Node'
import Edge from '../../model/Edge'

export default function(lookupUrl) {
  const nodeModel = new Node()
  const edgeModel = new Edge()
  const headStream = new SelectionModelStream()
  const tailStream = headStream
    .pipe(new DataModelNodeStream(nodeModel))
    .pipe(new DataModelFindTermStream(nodeModel, edgeModel, lookupUrl))
    .pipe(new DataModelAssociatedNodeStream(nodeModel))
    .pipe(new DataModelEdgeStream(edgeModel))
    .pipe(new DataModelAssociatedEdgeStream(edgeModel))

  return duplex(headStream, tailStream)
}
