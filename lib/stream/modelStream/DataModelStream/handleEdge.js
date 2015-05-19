import extend from 'xtend'

export default function(edges, nodes, action, push) {
  switch (action.type) {
    case 'afterCreate':
      if (edges.verify(nodes, action)) {
        edges.add(nodes, action)
      } else {
        push(
          extend(
            action, {
              type: 'detach'
            }))
      }
  }
}
