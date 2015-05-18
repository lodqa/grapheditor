import createNode from './createNode'
import jsPlumbOption from './jsPlumbOption'

const instance = jsPlumb.getInstance(jsPlumbOption)

export default function(selector) {
  let container = document.querySelector(selector)

  instance.setContainer(container)

  return {
    instance: instance,
    container: container,
    createNode: (id, name) => createNode(container, instance, id, name),
    select: (id) => {
      Array.from(container.querySelectorAll('.node')).forEach(el => el.classList.remove('selected'))
      container.querySelector(`#${id}`).classList.add('selected')
    }
  }
}
