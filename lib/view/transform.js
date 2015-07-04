import extend from 'xtend'

export default function(array, predicate, data) {
  return array
    .map(n => {
      if (predicate(n))
        n = extend(n, data)

      return n
    })
}
