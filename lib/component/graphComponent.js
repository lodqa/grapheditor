let instance = jsPlumb.getInstance({
    Anchors: ['Continuous', 'Continuous'],
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
  }),
  // set initial position of by percentage.
  positions = [
    [
      0, 0
    ],
    [
      100, 0
    ],
    [
      0, 100
    ],
    [
      100, 100
    ]
  ]

export default function(selector) {
  let container = document.querySelector(selector)

  instance.setContainer(container)

  return {
    instance: instance,
    createNode: (id, name) => {
      container.insertAdjacentHTML('beforeend', `
      <div id="${id}" class="node">
          ${name}
          <div class="endPoint"></div>
      </div>`)

      // Move node
      moveNode(container, id)

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

function moveNode(container, id) {
  let containerStyle = window.getComputedStyle(container),
    containerWidth = parseInt(containerStyle.width),
    containerHeight = parseInt(containerStyle.height),
    node = container.querySelector(`#${id}`),
    nodeStyle = window.getComputedStyle(node),
    position = positions.length ? positions.shift() : [0, 0]

  node.style.left = ((containerWidth - parseInt(nodeStyle.width)) * position[0] / 100) + 'px'
  node.style.top = ((containerHeight - parseInt(nodeStyle.height)) * position[1] / 100) + 'px'
}
