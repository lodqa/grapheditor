import unselectElement from './unselectElement'
import unhoverElement from './unhoverElement'

export {
  create,
  detach,
  remove,
  select,
  unselect,
  hover,
  unhover
}

function create(instance, sourceId, targetId, mouseover, mouseout) {
  let connection = instance.connect({
    source: sourceId,
    target: targetId
  })

  connection.bind('mouseover', mouseover)
  connection.bind('mouseout', mouseout)
}

function detach(instance, connection) {
  // Hack to wait the completion of rendering jsPlumb endpPints of the connection.
  window.requestAnimationFrame(() => instance.detach(connection))
}

function remove(instance, sourceId, targetId) {
  let connections = instance.getConnections({
      source: sourceId,
      target: targetId
    }),
    connection = connections[0]

    console.assert(connection, 'no connection', sourceId, targetId)

  instance.detach(connection)
}

function select(container, connection) {
  unselect(container)

  connection.canvas.classList.add('selected')

  let labelOverlay = connection.getOverlay('label')
  if (labelOverlay)
    labelOverlay.canvas.classList.add('selected')
}

function unselect(container) {
  unselectElement(container, '._jsPlumb_connector')
  unselectElement(container, '.edgeLabel')
}

function hover(instance, sourceId, targetId) {
  let connections = instance.getConnections({
      source: sourceId,
      target: targetId
    }),
    connection = connections[0]

  // Connections cannot be get when they are being dragging.
  if (!connection)
    return

  connection.canvas.classList.add('hover')

  let labelOverlay = connection.getOverlay('label')
  if (labelOverlay)
    labelOverlay.canvas.classList.add('hover')
}

function unhover(container) {
  unhoverElement(container, '._jsPlumb_connector')
  unhoverElement(container, '.edgeLabel')
}
