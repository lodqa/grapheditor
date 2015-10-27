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
    return add(this._map, action)
  }
  get snapshot() {
    return new NodeSnapshot(focusMustBeInMap(this._map, this._focus), toArray(this._map))
  }
  set focus(id) {
    this._focus = id
  }
  // Node provide validation for new node.
  verify(action) {
    return verify(this._map, action)
  }
}

function add(nodeMap, action) {
  let id = action.id || `node-${uuid.v1()}`

  nodeMap.set(id, {
    id,
    text: action.text,
    terms: []
  })

  return id
}

function focusMustBeInMap(nodeMap, focus) {
  if (nodeMap.get(focus)) {
    return focus
  }
}

function verify(nodeMap, action) {
  if (!action.text) {
    return {
      isValid: false,
      reason: 'no text.'
    }
  }

  return {
    isValid: true
  }
}
