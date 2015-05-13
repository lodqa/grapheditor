import createNode from './createNode'

const instance = jsPlumb.getInstance({
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
})

export default function(selector) {
  let container = document.querySelector(selector)

  instance.setContainer(container)

  return {
    instance: instance,
    createNode: (id, name) => createNode(container, instance, id, name)
  }
}
