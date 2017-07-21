import Model from './Model'
import toArray from './toArray'
import NodeSnapshot from './NodeSnapshot'

// Node has one focus node.
export default class extends Model {
  constructor() {
    super()
    this._focus = null
  }
  add(action) {
    super.add({
      id: action.id,
      text: action.text
    })
  }
  get snapshot() {
    return new NodeSnapshot(focusMustBeInMap(this._map, this._focus), toArray(this._map))
  }
  set focus(id) {
    this._focus = id
  }
}

function focusMustBeInMap(nodeMap, focus) {
  if (nodeMap.get(focus)) {
    return focus
  }
  return null
}
