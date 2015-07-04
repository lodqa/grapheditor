export default {
  Anchors: ['Continuous', 'Continuous'],
  ConnectionOverlays: [
    ['Arrow', {
      location: 1,
      id: 'arrow',
      length: 14,
      foldback: 0.8
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
  ConnectionsDetachable: false
}
