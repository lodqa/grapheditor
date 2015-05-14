export default function(edges, nodes, action, stream) {
  if (action.type === 'afterAdd') {
    edges.add(nodes, action)

    console.log('add edge', edges);

    stream.push(action)
  }
}
