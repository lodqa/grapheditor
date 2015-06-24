export default function(emitter, container) {
  return {
    drag: (e) => {
      try {
        let [x, y] = fromScreen(container, e.el.id, e.pos[0], e.pos[1])

        emitter.emit('dragging', {
          id: e.el.id,
          x: x,
          y: y
        })
      } catch (e) {
        console.error(e, e.stack);
      }
    }
  }
}

function fromScreen(container, id, left, top) {
  let node = container.querySelector(`#${id}`),
    containerStyle = window.getComputedStyle(container),
    containerWidth = parseInt(containerStyle.width),
    containerHeight = parseInt(containerStyle.height),
    nodeStyle = window.getComputedStyle(node),
    x = left / (containerWidth - parseInt(nodeStyle.width)),
    y = top / (containerHeight - parseInt(nodeStyle.height))

  return [x, y]
}