export default {
  Anchors: ['Continuous', 'Continuous'],
  ConnectionOverlays: [
    ['Arrow', {
      location: 1,
      id: 'arrow',
      length: 6,
      width: 6,
      foldback: 0.8
    }]
  ],
  Connector: ['StateMachine', {
    curviness: 20
  }],
  Endpoint: ['Dot', {
    radius: 3
  }],
  HoverPaintStyle: {
    strokeStyle: '#1e8151',
    lineWidth: 2
  },
  ConnectionsDetachable: true
}
