let instance = jsPlumb.getInstance({
  Endpoint: ["Dot", {
    radius: 2
  }],
  HoverPaintStyle: {
    strokeStyle: "#1e8151",
    lineWidth: 2
  },
  ConnectionOverlays: [
    ["Arrow", {
      location: 1,
      id: "arrow",
      length: 14,
      foldback: 0.8
    }],
    ["Label", {
      label: "FOO",
      id: "label",
      cssClass: "aLabel"
    }]
  ]
})

export default function(selector) {
  let container = document.querySelector(selector)

  instance.setContainer(container)

  return {
    instance: instance,
    createNode: (id, name) => {
      container.insertAdjacentHTML('beforeend', `
      <div class="w" id="${id}">${name}
          <div class="ep"></div>
      </div>`)

      let el = container.querySelector(`#${id}`)

      instance
        .draggable(el)
        .makeSource(el, {
          filter: ".ep",
          anchor: "Continuous",
          connector: ["StateMachine", {
            curviness: 20
          }],
          connectorStyle: {
            strokeStyle: "#5c96bc",
            lineWidth: 2,
            outlineColor: "transparent",
            outlineWidth: 4
          }
        })
        .makeTarget(el, {
          dropOptions: {
            hoverClass: "dragHover"
          },
          anchor: "Continuous",
          allowLoopback: true
        });
    }
  }
}
