// set initial position of by percentage.
const positions = [
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

export default function(container, id) {
  let containerStyle = window.getComputedStyle(container),
    containerWidth = parseInt(containerStyle.width),
    containerHeight = parseInt(containerStyle.height),
    node = container.querySelector(`#${id}`),
    nodeStyle = window.getComputedStyle(node),
    position = positions.length ? positions.shift() : [0, 0]

  node.style.left = ((containerWidth - parseInt(nodeStyle.width)) * position[0] / 100) + 'px'
  node.style.top = ((containerHeight - parseInt(nodeStyle.height)) * position[1] / 100) + 'px'
}
