import toLabelParam from '../toLabelParam'

export default function(connection, selected) {
  const editOverlay = connection.getOverlay('edit')
  const label = editOverlay.canvas.querySelector('input').value

  connection.addOverlay(toLabelParam(label, selected))
  connection.removeOverlay('edit')
}
