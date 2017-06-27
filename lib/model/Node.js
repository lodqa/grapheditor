import uuid from 'uuid'
import Model from './Model'
import toArray from './toArray'
import NodeSnapshot from './NodeSnapshot'

// Node has one focus node.
export default class extends Model {
  constructor() {
    super()
    this._focus = null
  }
  // Generate id unless.
  add(action) {
    const id = action.id || `node-${uuid.v1()}`

    super.add({
      id,
      text: action.text
    })

    return id
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
