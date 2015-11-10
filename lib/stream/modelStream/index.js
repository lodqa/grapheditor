import duplex from 'duplexer'
import SelectionModelStream from './SelectionModelStream'
import DataModelFindTermStream from './DataModelFindTermStream'
import DataModelUpdateMappingsStream from './DataModelUpdateMappingsStream'
import DataModelFindLabelStream from './DataModelFindLabelStream'
import DataModelUpdateLabelStream from './DataModelUpdateLabelStream'
import DataModelNodeStream from './DataModelNodeStream'
import DataModelEdgeStream from './DataModelEdgeStream'
import DataModelAssociatedEdgeStream from './DataModelAssociatedEdgeStream'
import DataModelAssociatedNodeStream from './DataModelAssociatedNodeStream'
import Node from '../../model/Node'
import Edge from '../../model/Edge'

export default function(lookupUrl) {
  let nodeModel = new Node(),
    edgeModel = new Edge(),
    headStream = new SelectionModelStream(),
    tailStream = headStream
    .pipe(new DataModelNodeStream(nodeModel))
    .pipe(new DataModelFindTermStream(nodeModel, edgeModel, lookupUrl))
    .pipe(new DataModelUpdateMappingsStream(nodeModel, edgeModel))
    .pipe(new DataModelFindLabelStream())
    .pipe(new DataModelUpdateLabelStream(nodeModel, edgeModel))
    .pipe(new DataModelAssociatedNodeStream(nodeModel))
    .pipe(new DataModelEdgeStream(edgeModel))
    .pipe(new DataModelAssociatedEdgeStream(edgeModel))

  return duplex(headStream, tailStream)
}
