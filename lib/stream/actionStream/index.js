import selector from '../selector'
import InputNodeActionStream from './InputNodeActionStream'
import EditNodeActionStream from './EditNodeActionStream'
import EdgeActionStream from './EdgeActionStream'
import NodeActionStream from './NodeActionStream'
import DebugLogStream from '../DebugLogStream'

let funnel = new DebugLogStream('FunnelStream')

new InputNodeActionStream(selector.INPUT_NODE).pipe(funnel)
new EditNodeActionStream(selector.EDIT_NODE).pipe(funnel)
new EdgeActionStream(selector.GRPAPH).pipe(funnel)
new NodeActionStream(selector.GRPAPH).pipe(funnel)

export default funnel
