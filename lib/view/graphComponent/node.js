import createNode from './createNode'
import unselect from './unselect'

export {
  createNode,
  updateNode,
  moveNode,
  deleteNode,
  selectNode,
  unselectNode,
  hoverNode,
  unhoverNode
}

function updateNode(container, id, name, url) {
  let node = container.querySelector(`#${id}`)
  node.firstChild.nodeValue = name
  node.title = url
}

function moveNode(container, instance, id, x, y) {
  let node = container.querySelector(`#${id}`)

  if(node){
    let containerStyle = window.getComputedStyle(container),
      containerWidth = parseInt(containerStyle.width),
      containerHeight = parseInt(containerStyle.height),
      nodeStyle = window.getComputedStyle(node)

    node.style.left = ((containerWidth - parseInt(nodeStyle.width)) * x) + 'px'
    node.style.top = ((containerHeight - parseInt(nodeStyle.height)) * y) + 'px'
    instance.repaintEverything()
  }
}

function deleteNode(container, id) {
  let div = container.querySelector(`#${id}`)
  container.removeChild(div)
}

function selectNode(container, id) {
  unselectNode(container)
  container.querySelector(`#${id}`).classList.add('selected')
}

function unselectNode(container) {
  unselect(container, '.node')
}

function hoverNode(instance, sourceId, targetId) {
  let connections = instance.getConnections({
    source: sourceId,
    target: targetId
  })
  let connection = connections[0]
  connection.canvas.classList.add('node_hover')

  let labelOverlay = connection.getOverlay('label')
  if (labelOverlay)
    labelOverlay.canvas.classList.add('node_hover')
}

function unhoverNode(container) {
  unhover(container, '._jsPlumb_connector')
  unhover(container, '.edgeLabel')
}

function unhover(container, selector) {
  Array.from(container.querySelectorAll(selector))
    .forEach(el => el.classList.remove('node_hover'))
}