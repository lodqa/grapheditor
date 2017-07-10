import create from './createNode'
import unselectElement from './unselectElement'
import unhoverElement from './unhoverElement'
import removeClass from './removeClass'

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

function move(container, instance, id, x, y) {
  const node = container.querySelector(`#${id}`)

  if (node) {
    const containerStyle = window.getComputedStyle(container)
    const containerWidth = parseInt(containerStyle.width)
    const containerHeight = parseInt(containerStyle.height)
    const nodeStyle = window.getComputedStyle(node)

    node.style.left = `${(containerWidth - parseInt(nodeStyle.width)) * x}px`
    node.style.top = `${(containerHeight - parseInt(nodeStyle.height)) * y}px`
    instance.repaintEverything()
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

function endEdit(container, id) {
  console.log('ond');
  container.querySelector(`#${id}`).classList.remove('editing')
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
