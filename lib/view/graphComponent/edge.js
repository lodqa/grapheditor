import unselectElement from './unselectElement'
import unhoverElement from './unhoverElement'

export {
  create,
  update,
  detach,
  remove,
  select,
  unselect,
  hover,
  unhover
}

function create(instance, sourceId, targetId, label, url, mouseover, mouseout) {
  let connection = instance.connect({
    source: sourceId,
    target: targetId,
    parameters: {
      url: url,
    },
    overlays: label ? [toLabelParam(label)] : null
  })

  connection.bind('mouseover', mouseover)
  connection.bind('mouseout', mouseout)
}

function update(instance, sourceId, targetId, label, url) {
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
  })

  console.assert(connections.length === 1, `connection dose not exist than sourceId is ${sourceId} and targetId is ${targetId}`)

  let connection = connections[0]
  connection.canvas.classList.add('hover')

  let labelOverlay = connection.getOverlay('label')
  if (labelOverlay)
    labelOverlay.canvas.classList.add('hover')
}

function unhover(container) {
  unhoverElement(container, '._jsPlumb_connector')
  unhoverElement(container, '.edgeLabel')
}
