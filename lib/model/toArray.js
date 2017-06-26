import clone from 'clone'

export default function(map) {
  const ret = []

  for (const e of map.values()) {
    ret.push(clone(e))
  }
  return ret
}
