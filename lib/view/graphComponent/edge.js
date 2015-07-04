import unselect from './unselect'

export{
  createEdge,
  updateEdge,
  detachEdge,
  deleteEdge,
  selectEdge,
  unselectEdge
}

function createEdge(instance, sourceId, targetId, label, url, mouseover, mouseout) {
  let connection = instance.connect({
    source: sourceId,
    target: targetId,
    parameters: {
      url: url,
    },
    overlays: [toLabelParam(label)]
  })

  connection.bind('mouseover', mouseover)
  connection.bind('mouseout', mouseout)
}

function updateEdge(instance, sourceId, targetId, label, url) {
  let connections = instance.getConnections({
    source: sourceId,
    target: targetId
  })

  connections.forEach(c => {
    let labelOverlay = c.getOverlay("label")

    if (labelOverlay) {
      labelOverlay.setLabel(label)
    } else {
      c.addOverlay(toLabelParam(label))
    }
    c.setParameter('url', url)
  })
}

function toLabelParam(label) {
  return ['Label', {
    label: label,
    id: 'label',
    cssClass: 'edgeLabel'
  }]
}

function detachEdge(instance, connection) {
  // Hack to wait the completion of rendering jsPlumb endpPints of the connection.
  window.requestAnimationFrame(() => instance.detach(connection))
}

function deleteEdge(instance, sourceId, targetId) {
  let connections = instance.getConnections({
      source: sourceId,
      target: targetId
    }),
    connection = connections[0]

  instance.detach(connection)
}

function selectEdge(container, connection) {
  unselectEdge(container)

  connection.canvas.classList.add('selected')

  let labelOverlay = connection.getOverlay('label')
  if (labelOverlay)
    labelOverlay.canvas.classList.add('selected')
}

function unselectEdge(container) {
  unselect(container, '._jsPlumb_connector')
  unselect(container, '.edgeLabel')
}
