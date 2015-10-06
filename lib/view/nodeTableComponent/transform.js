import NodeData from '../../model/NodeData'

export default function(origin, predicate, params) {
  console.assert(origin instanceof NodeData, 'The origin MUST be NodeData.')

  origin.list = origin
    .list
    .map((n) => {
      if (predicate(n)) {
        return Object.assign({}, n, params)
      }

      return n
    })

  return origin
}
