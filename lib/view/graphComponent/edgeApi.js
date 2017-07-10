import {
  jsPlumb
} from 'jsplumb'
import unselectElement from './unselectElement'
import unhoverElement from './unhoverElement'

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
function create(instance, sourceId, targetId, label = '') {
  // Check presence of nodes before call a jsPlumb api, for logging detail information.
  // This check is done in jsPlumb, too.
  const source = instance.getElement(sourceId)
  const target = instance.getElement(targetId)

  console.assert(source, 'the source is not exists :', sourceId)
  console.assert(target, 'the target is not exists :', targetId)

  const connParams = {
    source,
    target,
    type: 'basic',
    overlays: [toLabelParam(label)]
  }

  instance.connect(connParams)
}

// This function are called after edges are created in the view and the model.
// For example, when a edge created by programable API,
// the edge is added to the view by the create function and added to the model and then this function is called.
// Othewise, when user drag and drop to create a new edge,
// the edge is added to the model by a jsPlumb's 'connection' event and then this function is called.
function afterCreate(instance, sourceId, targetId, mouseover, mouseout) {
  const connection = toConnection(instance, sourceId, targetId)

  // Add the label overlay unless it
  // Because a new edge that created by  user drag and drop end point in the graph has no label overlay.
  const labelOverlay = connection.getOverlay('label')

  if (!labelOverlay) {
    connection.addOverlay(toLabelParam(''))
  }

  // Bind hover events handlers a new edge.
  connection.bind('mouseover', mouseover)
  connection.bind('mouseout', mouseout)
}

function update(instance, sourceId, targetId, label) {
  const connection = toConnection(instance, sourceId, targetId)
  const labelOverlay = connection.getOverlay('label')

  // The labelOverlay does not exists during edit
  if (!labelOverlay) {
    return
  }

  if (label) {
    getNameSpan(labelOverlay).innerHTML = label
    getEdgeLabel(labelOverlay)
      .classList.remove('no-text')
  } else {
    getEdgeLabel(labelOverlay)
      .classList.add('no-text')
  }
}

function remove(instance, sourceId, targetId) {
  instance.deleteConnection(toConnection(instance, sourceId, targetId))
}

function select(container, instance, sourceId, targetId) {
  unselect(container, instance)

  const connection = toConnection(instance, sourceId, targetId)

  addClass(connection, 'selected')
}

function unselect(container, instance) {
  instance.getAllConnections()
    .filter((connection) => connection.getOverlay('edit'))
    .forEach(swithOverlayToLabel)

  unselectElement(container, '.jtk-connector')
  unselectElement(container, '.edgeLabel')
}

function startEdit(container, instance, sourceId, targetId, label = '') {
  const connection = toConnection(instance, sourceId, targetId)

  let editOverlay = connection.getOverlay('edit')

  // Create a overlay for  editing if it does not exists
  if (!editOverlay) {
    editOverlay = connection.addOverlay(toEditParam(label))
  }

  // This method is called when the edge is clicked even if during editing.
  // At that time the input element lose focus once.
  editOverlay.canvas.querySelector('input').focus()
  connection.removeOverlay('label')
}

function endEdit(instance, sourceId, targetId) {
  const connection = toConnection(instance, sourceId, targetId)

  swithOverlayToLabel(connection)
}

function hover(instance, sourceId, targetId) {
  const connection = toConnection(instance, sourceId, targetId)

  // Connections cannot be get when they are being dragging.
  if (!connection) {
    return
  }

  addClass(connection, 'hover')
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
function toConnection(instance, sourceId, targetId) {
  console.assert(sourceId, 'sourceId is required.')
  console.assert(targetId, 'targetId is required.')

  const connections = instance.getConnections({
    source: sourceId,
    target: targetId
  })
  const connection = connections[0]

  return connection
}

function addClass(connection, className) {
  connection.canvas.classList.add(className)

  addClassToLabel(connection, className)
}

function addClassToLabel(connection, className) {
  const labelOverlay = connection.getOverlay('label')

  if (labelOverlay) {
    getEdgeLabel(labelOverlay)
      .classList.add(className)
  }
}

function toLabelParam(label) {
  return toParam('label', `
    <div class="edgeLabel ${label ? '' : 'no-text'}">
      <div class="name">${label}</div>
      <div class="editIcon"><i class="fa fa-pencil"></i></div>
      <div class="deleteIcon"><i class="fa fa-trash-o"></i></div>
    </div>`)
}

function toEditParam(label) {
  return toParam('edit', `
    <div class="edgeEdit">
      <input value="${label}"></input>
      <div class="deleteIcon"><i class="fa fa-trash-o"></i></div>
    </div>`)
}

function toParam(id, innerHTML) {
  return ['Custom', {
    create() {
      const el = document.createElement('div')

      el.innerHTML = innerHTML
      return el
    },
    id
  }]
}

function getEdgeLabel(labelOverlay) {
  return labelOverlay.canvas.children[0]
}

function getNameSpan(labelOverlay) {
  return labelOverlay.canvas.querySelector('.name')
}

function getTextFromConnection(connection) {
  const labelOverlay = connection.getOverlay('label')

  if (labelOverlay) {
    return getNameSpan(labelOverlay).innerHTML
  }

  return ''
}

function swithOverlayToLabel(connection) {
  const editOverlay = connection.getOverlay('edit')
  const label = editOverlay.canvas.querySelector('input').value

  connection.addOverlay(toLabelParam(label))
  connection.removeOverlay('edit')
}
