export default function(array, predicate, data) {
  return array
    .map(n => {
      if (predicate(n))
        n = Object.assign({}, n, data)

      return n
    })
}
