let instance = jsPlumb.getInstance({
  Anchors : ['Continuous', 'Continuous'],
  ConnectionOverlays: [
    ['Arrow', {
      location: 1,
      id: 'arrow',
      length: 14,
      foldback: 0.8
    }],
    ['Label', {
      label: 'Edge',
      id: 'label',
      cssClass: 'edgeLabel'
    }]
  ],
  Connector: ['StateMachine', {
    curviness: 20
  }],
  Endpoint: ['Dot', {
    radius: 2
  }],
  HoverPaintStyle: {
    strokeStyle: '#1e8151',
    lineWidth: 2
  },
})

export default function(selector) {
  let container = document.querySelector(selector)

  instance.setContainer(container)

  return {
    instance: instance,
    createNode: (id, name) => {
      container.insertAdjacentHTML('beforeend', `
      <div class="node" id="${id}">${name}
          <div class="endPoint"></div>
      </div>`)

      instance
        .draggable(id)
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
          allowLoopback: true
        });
    }
  }
}
