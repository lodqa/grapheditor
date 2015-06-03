import createNode from './createNode'
import jsPlumbOption from './jsPlumbOption'

const instance = jsPlumb.getInstance(jsPlumbOption)

export default function(selector) {
  let container = document.querySelector(selector)

  instance.setContainer(container)

  return {
    instance: instance,
    container: container,
    createNode: (id, name, url) => createNode(container, instance, id, name, url),
    updateNode: (id, name, url) => updateNode(container, id, name, url),
    selectNode: (id) => selectNode(container, id),
    unselectNode: () => unselectNode(container),
    createEdge: (sourceId, targetId, label, url) => createEdge(instance, sourceId, targetId, label, url),
    updateEdge: (sourceId, targetId, label, url) => updateEdge(instance, sourceId, targetId, label, url),
    detachEdge: (connection) => detachEdge(instance, connection),
    selectEdge: (connection) => selectEdge(container, connection),
    unselectEdge: () => unselectEdge(container)
  }
}

function updateNode(container, id, name, url) {
  let node = container.querySelector(`#${id}`)
  node.firstChild.nodeValue = name
  node.title = url
}

function selectNode(container, id) {
  unselectNode(container)
  container.querySelector(`#${id}`).classList.add('selected')
}

function unselectNode(container) {
  unselect(container, '.node')
}

function createEdge(instance, sourceId, targetId, label, url) {
  let connection = instance.connect({
    source: sourceId,
    target: targetId,
    parameters: {
      url: url,
    },
    overlays: [toLabelParam(label)]
  })
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

function unselect(container, selector) {
  Array.from(container.querySelectorAll(selector))
    .forEach(el => el.classList.remove('selected'))
}
