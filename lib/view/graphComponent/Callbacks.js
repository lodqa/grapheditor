export default function(emitter, container) {
  return {
    drag: (e) => {
      try {
        const [x, y] = fromScreen(container, e.el.id, e.pos[0], e.pos[1])

        emitter.emit('dragging', {
          id: e.el.id,
          x,
          y
        })
      } catch (err) {
        console.error(err, err.stack)
      }
    },
    connectionMouseover: (connection, originalEvent) => {
      try {
        emitter.emit('connectionMouseover', connection, originalEvent)
      } catch (e) {
        console.error(e, e.stack)
      }
    },
    connectionMouseout: (connection, originalEvent) => {
      try {
        emitter.emit('connectionMouseout', connection, originalEvent)
      } catch (e) {
        console.error(e, e.stack)
      }
    }
  }
}

function fromScreen(container, id, left, top) {
  const node = container.querySelector(`#${id}`)
  const containerStyle = window.getComputedStyle(container)
  const containerWidth = parseInt(containerStyle.width)
  const containerHeight = parseInt(containerStyle.height)
  const nodeStyle = window.getComputedStyle(node)
  const x = left / (containerWidth - parseInt(nodeStyle.width))
  const y = top / (containerHeight - parseInt(nodeStyle.height))

  return [x, y]
}
