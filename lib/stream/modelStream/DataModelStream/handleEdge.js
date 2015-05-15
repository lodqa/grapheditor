export default function(edges, nodes, action, stream) {
  switch (action.type) {
    case 'afterCreate':
      edges.add(nodes, action)
      stream.push(action)
      break;
    default:
      stream.push(action)
  }
}
