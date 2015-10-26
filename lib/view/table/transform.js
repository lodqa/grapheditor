export default function(list, predicate, params) {
  return list
    .map((n) => {
      if (predicate(n)) {
        return Object.assign({}, n, params)
      }

      return n
    })
}
