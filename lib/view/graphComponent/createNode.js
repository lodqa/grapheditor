export default function(container, instance, id, name, callbacks) {
  container.insertAdjacentHTML('beforeend', `
  <div id="${id}" class="node"">
      ${name}
      <div class="sourcePoint"></div>
      <div class="deleteIcon"><i class="fa fa-trash-o"></i></div>
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
