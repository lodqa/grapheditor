import NodeSnapshot from '../../../model/NodeSnapshot'
import transform from '../transform'

export default function(origin, predicate, params) {
  console.assert(origin instanceof NodeSnapshot, 'The origin MUST be NodeSnapshot.')

  origin.list = transform(origin.list, predicate, params)

  return origin
}
