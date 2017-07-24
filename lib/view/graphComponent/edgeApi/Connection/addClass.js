import getEdgeLabel from './getEdgeLabel'

export default function(connection, className) {
  connection.canvas.classList.add(className)

  addClassToLabel(connection, className)
}

function addClassToLabel(connection, className) {
  const labelOverlay = connection.getOverlay('label')

  if (labelOverlay) {
    getEdgeLabel(labelOverlay)
      .classList.add(className)
  }
}
