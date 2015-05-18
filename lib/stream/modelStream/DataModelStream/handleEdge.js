export default function(edges, nodes, action, push) {
  switch (action.type) {
    case 'afterCreate':
      edges.add(nodes, action)
      push(action)
  }
}
