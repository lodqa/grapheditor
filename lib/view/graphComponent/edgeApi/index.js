import {
  jsPlumb
} from 'jsplumb'
import unselectElement from '../unselectElement'
import unhoverElement from '../unhoverElement'
import Connection from './Connection'
import getNameSpan from './getNameSpan'
import * as connectionUtil from './connectionUtil'

export {
  afterCreate,
  create,
  update,
  remove,
  select,
  startEdit,
  endEdit,
  unselect,
  hover,
  unhover,
  toEdgeValue
}

// Create a new edge by programrable API.
function create(instance, sourceId, targetId, label) {
  connectionUtil.register(instance, sourceId, targetId, label)
}

// This function are called after edges are created in the view and the model.
// For example, when a edge created by programable API,
// the edge is added to the view by the create function and added to the model and then this function is called.
// Othewise, when user drag and drop to create a new edge,
// the edge is added to the model by a jsPlumb's 'connection' event and then this function is called.
function afterCreate(instance, sourceId, targetId, mouseover, mouseout) {
  const connection = new Connection(instance, sourceId, targetId)

  connection.addLabelOverlay()
  connection.bindHoverEventhandlers(mouseover, mouseout)
}

function update(instance, sourceId, targetId, label) {
  const connection = new Connection(instance, sourceId, targetId)

  connection.updateText(label)
}

function remove(instance, sourceId, targetId) {
  new Connection(instance, sourceId, targetId).remove()
}

function select(container, instance, sourceId, targetId) {
  unselect(container, instance)

  new Connection(instance, sourceId, targetId).select()
}

function unselect(container, instance) {
  connectionUtil.unselectAll(instance)

  unselectElement(container, '.jtk-connector')
  unselectElement(container, '.edgeLabel')
}

function startEdit(container, instance, sourceId, targetId, label = '') {
  const connection = new Connection(instance, sourceId, targetId)

  connection.startEdit(label)
}

function endEdit(instance, sourceId, targetId) {
  const connection = new Connection(instance, sourceId, targetId)

  connection.endEdit()
}

function hover(instance, sourceId, targetId) {
  const connection = new Connection(instance, sourceId, targetId)

  connection.hover()
}

function unhover(container) {
  unhoverElement(container, '.jtk-connector')
  unhoverElement(container, '.edgeLabel')
}

function toEdgeValue(connection, withText = false) {
  let realConnection = connection

  // When an event is occurs on the label.
  if (connection.component) {
    realConnection = connection.component
  }

  console.assert(realConnection instanceof jsPlumb.Connection, 'This is not conneciton: ', realConnection)

  const value = {
    sourceId: realConnection.sourceId,
    targetId: realConnection.targetId
  }

  if (withText) {
    value.text = getTextFromConnection(realConnection)
  }

  return value
}

// private
function getTextFromConnection(connection) {
  const labelOverlay = connection.getOverlay('label')

  if (labelOverlay) {
    return getNameSpan(labelOverlay).innerHTML
  }

  return ''
}
