export default function(origin, predicate, params) {
  origin.list = origin
    .list
    .map(n => {
      if (predicate(n))
        n = Object.assign({}, n, params)

      return n
    })

  return origin
}
