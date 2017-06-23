export default function(container, instance, id, name, callbacks) {
  container.insertAdjacentHTML('beforeend', `
  <div id="${id}" class="node"">
      <span class="name">${name}</span>
      <div class="sourcePoint"></div>
      <div class="editIcon"><i class="fa fa-pencil"></i></div>
      <div class="deleteIcon"><i class="fa fa-trash-o"></i></div>
      <input class="editInput"></input>
  </div>`)

  instance
    .draggable(id, callbacks)
    .makeSource(id, {
      filter: '.sourcePoint',
      anchor: 'Continuous',
      connectorStyle: {
        stroke: '#5c96bc',
        strokeWidth: 2,
        outlineStroke: 'transparent',
        outlineWidth: 4
      },
      connectionType: 'basic'
    })
    .makeTarget(id, {
      dropOptions: {
        hoverClass: 'nodeDragHover'
      },
      anchor: 'Continuous',
      allowLoopback: false
    })

  container.querySelector('.placeholder').classList.add('hidden')
}
