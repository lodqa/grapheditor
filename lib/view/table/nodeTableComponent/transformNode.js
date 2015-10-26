import NodeData from '../../../model/NodeData'
import transform from '../transform'

export default function(origin, predicate, params) {
  console.assert(origin instanceof NodeData, 'The origin MUST be NodeData.')

  origin.list = transform(origin.list, predicate, params)

  return origin
}
