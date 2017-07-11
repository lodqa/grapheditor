import create from './createNode'
import unselectElement from './unselectElement'
import unhoverElement from './unhoverElement'
import removeClass from './removeClass'
import throttle from 'throttleit'

export {
  create,
  endEdit,
  focus,
  update,
  move,
  remove,
  select,
  startEdit,
  unselect,
  hover,
  unhover
}

function update(container, instance, id, name) {
  const node = container.querySelector(`#${id} .name`)

  console.assert(node, `node is not found, id: ${id}`)

  if (node.childNodes.length) {
    node.firstChild.nodeValue = name
  } else {
    // A node has no childNode when create with out any name.
    node.appendChild(document.createTextNode(name))
  }
  console.assert(node.childNodes.length, `node has no childNodes, node: ${node.outerHTML}`)

  // To move endpoints of edge
  instance.repaintEverything()
}

const throttledRepaint = throttle((instance) => instance.repaintEverything(), 15)

// Move node events is occured on every animation frame.
// This function is important for CPU load.
function move(container, instance, id, x, y) {
  const node = document.getElementById(id)

  if (node) {
    const containerStyle = window.getComputedStyle(container)
    const containerWidth = parseInt(containerStyle.width)
    const containerHeight = parseInt(containerStyle.height)
    const nodeStyle = window.getComputedStyle(node)
    const width = nodeStyle.width
    const height = nodeStyle.height

    // Update node position on next animation frame to prevent reflow
    setNewPositionNode(node, (containerWidth - parseInt(width)) * x, (containerHeight - parseInt(height)) * y)
    requestAnimationFrame(updateAllNodePosition)

    // The function of `repaintEverything` is heavy, so throttle it to improve performance
    throttledRepaint(instance)
  }
}

const newNodePosition = new Map()
const nodePosition = new Map()

function setNewPositionNode(node, left, top) {
  newNodePosition.set(node, {left, top})
}

// Update all position node if position is changed.
function updateAllNodePosition() {
  for (const [node, position] of newNodePosition) {
    if (!nodePosition.has(node)) {
      nodePosition.set(node, {left: 0, top: 0})
    }

    const old = nodePosition.get(node)

    if (Math.abs(old.left - position.left) > 1) {
      node.style.left = `${position.left}px`
      old.left = position.left
    }

    if (Math.abs(old.top - position.top) > 1) {
      node.style.top = `${position.top}px`
      old.top = position.top
    }
  }
}

function remove(container, id) {
  console.assert(id, 'id MUST be not empty.')

  const div = container.querySelector(`#${id}`)

  container.removeChild(div)

  if (container.querySelectorAll('.node').length === 0) {
    container.querySelector('.placeholder').classList.remove('hidden')
  }
}

function focus(container, id) {
  removeClass(container, '.node', 'focus')

  const node = container.querySelector(`#${id}`)

  node.classList.add('focus')
}

function select(container, instance, id) {
  unselect(container, instance, id)
  const node = container.querySelector(`#${id}`)

  node.classList.add('selected')
}

function startEdit(container, instance, id, name) {
  container.querySelector(`#${id}`).classList.add('editing')

  // set current name to edit input
  const input = container.querySelector(`#${id} .editInput`)

  input.value = name
  input.focus()

  // To move endpoints of edge
  instance.repaintEverything()
}

function endEdit(container, instance, id) {
  container.querySelector(`#${id}`).classList.remove('editing')

  // To move endpoints of edge
  instance.repaintEverything()
}

function unselect(container, instance, id) {
  unselectElement(container, '.node', id)

  // To move endpoints of edge
  instance.repaintEverything()
}

function hover(container, id) {
  console.assert(id, 'id MUST be not empty.')

  container.querySelector(`#${id}`).classList.add('hover')
}

function unhover(container) {
  unhoverElement(container, '.node')
}
