import clone from 'clone'

export default function(map) {
  let ret = []

  for (let e of map.values()) {
    ret.push(clone(e))
  }
  return ret
}
