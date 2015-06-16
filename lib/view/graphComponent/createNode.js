export default function(container, instance, id, name, url, callbacks) {
  container.insertAdjacentHTML('beforeend', `
  <div id="${id}" class="node" title="${url}">
      ${name}
      <div class="endPoint"></div>
  </div>`)

  instance
    .draggable(id, callbacks)
    .makeSource(id, {
      filter: ".endPoint",
      connectorStyle: {
        strokeStyle: "#5c96bc",
        lineWidth: 2,
        outlineColor: "transparent",
        outlineWidth: 4
      }
    })
    .makeTarget(id, {
      dropOptions: {
        hoverClass: "nodeDragHover"
      },
      allowLoopback: false
    });
}
