export default function(container, instance, id, name, callbacks) {
  container.insertAdjacentHTML('beforeend', `
  <div id="${id}" class="node"">
      ${name}
      <div class="sourcePoint"></div>
  </div>`)

  instance
    .draggable(id, callbacks)
    .makeSource(id, {
      filter: '.sourcePoint',
      connectorStyle: {
        strokeStyle: '#5c96bc',
        lineWidth: 2,
        outlineColor: 'transparent',
        outlineWidth: 4
      }
    })
    .makeTarget(id, {
      dropOptions: {
        hoverClass: 'nodeDragHover'
      },
      allowLoopback: false
    })
}
