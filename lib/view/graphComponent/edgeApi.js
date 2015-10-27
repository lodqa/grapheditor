import unselectElement from './unselectElement'
import unhoverElement from './unhoverElement'

export {
  create,
  update,
  remove,
  select,
  unselect,
  hover,
  unhover
}

function create(instance, sourceId, targetId, label, mouseover, mouseout) {
  // Check presence of nodes before call a jsPlumb api, for logging detail information.
  // This check is done in jsPlumb, too.
  let source = instance.getElement(sourceId),
    target = instance.getElement(targetId)

  console.assert(source, 'the source is not exists :', sourceId)
  console.assert(target, 'the target is not exists :', targetId)

  let connParams = {
    source,
    target
  }

  if (label) {
    connParams.overlays = [toLabelParam(label)]
  }

  let connection = instance.connect(connParams)

  connection.bind('mouseover', mouseover)
  connection.bind('mouseout', mouseout)
}

function update(instance, sourceId, targetId, label) {
  let connection = toConnection(instance, sourceId, targetId),
    labelOverlay = connection.getOverlay('label')

  if (labelOverlay) {
    labelOverlay.setLabel(label)
  } else {
    connection.addOverlay(toLabelParam(label))
  }
}

function toLabelParam(label) {
  return ['Label', {
    label,
    id: 'label',
    cssClass: 'edgeLabel'
  }]
}

function remove(instance, sourceId, targetId) {
  instance.detach(toConnection(instance, sourceId, targetId))
}

function select(container, instance, sourceId, targetId) {
  unselect(container)

  let connection = toConnection(instance, sourceId, targetId)

  connection.canvas.classList.add('selected')

  let labelOverlay = connection.getOverlay('label')

  if (labelOverlay) {
    labelOverlay.canvas.classList.add('selected')
  }
}

function unselect(container) {
  unselectElement(container, '._jsPlumb_connector')
  unselectElement(container, '.edgeLabel')
}

function hover(instance, sourceId, targetId) {
  let connection = toConnection(instance, sourceId, targetId)

  // Connections cannot be get when they are being dragging.
  if (!connection) {
    return
  }

  connection.canvas.classList.add('hover')

  let labelOverlay = connection.getOverlay('label')

  if (labelOverlay) {
    labelOverlay.canvas.classList.add('hover')
  }
}

function unhover(container) {
  unhoverElement(container, '._jsPlumb_connector')
  unhoverElement(container, '.edgeLabel')
}

function toConnection(instance, sourceId, targetId) {
  console.assert(sourceId, 'sourceId is required.')
  console.assert(targetId, 'targetId is required.')

  let connections = instance.getConnections({
      source: sourceId,
      target: targetId
    }),
    connection = connections[0]

  return connection
}
