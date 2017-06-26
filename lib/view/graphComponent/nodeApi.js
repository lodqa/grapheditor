import create from './createNode'
import unselectElement from './unselectElement'
import unhoverElement from './unhoverElement'

export {
  create,
  endEdit,
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
  let node = container.querySelector(`#${id} .name`)

  node.firstChild.nodeValue = name

  // To move endpoints of edge
  instance.repaintEverything()
}

function move(container, instance, id, x, y) {
  let node = container.querySelector(`#${id}`)

  if (node) {
    let containerStyle = window.getComputedStyle(container),
      containerWidth = parseInt(containerStyle.width),
      containerHeight = parseInt(containerStyle.height),
      nodeStyle = window.getComputedStyle(node)

    node.style.left = `${(containerWidth - parseInt(nodeStyle.width)) * x}px`
    node.style.top = `${(containerHeight - parseInt(nodeStyle.height)) * y}px`
    instance.repaintEverything()
  }
}

function remove(container, id) {
  console.assert(id, 'id MUST be not empty.')

  let div = container.querySelector(`#${id}`)

  container.removeChild(div)

  if (container.querySelectorAll('.node').length === 0) {
    container.querySelector('.placeholder').classList.remove('hidden')
  }
}

function select(container, id) {
  unselect(container, id)
  container.querySelector(`#${id}`).classList.add('selected')
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

function unselect(container, id) {
  unselectElement(container, '.node', id)
}

function hover(container, id) {
  console.assert(id, 'id MUST be not empty.')

  container.querySelector(`#${id}`).classList.add('hover')
}

function unhover(container) {
  unhoverElement(container, '.node')
}
