import unselectElement from './unselectElement'
import unhoverElement from './unhoverElement'

export {
  afterCreate,
  create,
  update,
  remove,
  select,
  unselect,
  hover,
  unhover
}

// Bind hover event handlers a new edge that created by jsPlumb
// when user drag and drop end point on the graph.
function afterCreate(instance, sourceId, targetId, mouseover, mouseout) {
  const connection = toConnection(instance, sourceId, targetId)

  connection.bind('mouseover', mouseover)
  connection.bind('mouseout', mouseout)
}

function create(instance, sourceId, targetId, label, mouseover, mouseout) {
  // Check presence of nodes before call a jsPlumb api, for logging detail information.
  // This check is done in jsPlumb, too.
  const source = instance.getElement(sourceId)
  const target = instance.getElement(targetId)

  console.assert(source, 'the source is not exists :', sourceId)
  console.assert(target, 'the target is not exists :', targetId)

  const connParams = {
    source,
    target,
    type: 'basic'
  }

  if (label) {
    connParams.overlays = [toLabelParam(label)]
  }

  const connection = instance.connect(connParams)

  connection.bind('mouseover', mouseover)
  connection.bind('mouseout', mouseout)
}

function update(instance, sourceId, targetId, label) {
  const connection = toConnection(instance, sourceId, targetId)
  const labelOverlay = connection.getOverlay('label')

  if (label) {
    if (labelOverlay) {
      labelOverlay.setLabel(label)
    } else {
      connection.addOverlay(toLabelParam(label))
    }
  } else {
    connection.removeOverlay('label')
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
  instance.deleteConnection(toConnection(instance, sourceId, targetId))
}

function select(container, instance, sourceId, targetId) {
  unselect(container)

  const connection = toConnection(instance, sourceId, targetId)

  connection.canvas.classList.add('selected')

  const labelOverlay = connection.getOverlay('label')

  if (labelOverlay) {
    labelOverlay.canvas.classList.add('selected')
  }
}

function unselect(container) {
  unselectElement(container, '.jtk-connector')
  unselectElement(container, '.edgeLabel')
}

function hover(instance, sourceId, targetId) {
  const connection = toConnection(instance, sourceId, targetId)

  // Connections cannot be get when they are being dragging.
  if (!connection) {
    return
  }

  connection.canvas.classList.add('hover')

  const labelOverlay = connection.getOverlay('label')

  if (labelOverlay) {
    labelOverlay.canvas.classList.add('hover')
  }
}

function unhover(container) {
  unhoverElement(container, '.jtk-connector')
  unhoverElement(container, '.edgeLabel')
}

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
