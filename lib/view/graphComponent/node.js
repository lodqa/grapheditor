import create from './createNode'
import unselectElement from './unselectElement'

export {
  create,
  update,
  move,
  remove,
  select,
  unselect
}

function update(container, id, name, url) {
  let node = container.querySelector(`#${id}`)
  node.firstChild.nodeValue = name
  node.title = url
}

function move(container, instance, id, x, y) {
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

function remove(container, id) {
  let div = container.querySelector(`#${id}`)
  container.removeChild(div)
}

function select(container, id) {
  unselect(container)
  container.querySelector(`#${id}`).classList.add('selected')
}

function unselect(container) {
  unselectElement(container, '.node')
}
