import Springy from 'Springy'

// Singleton.
let graph = new Springy.Graph(),
  layout = new Springy.Layout.ForceDirected(graph, 400.0, 400.0, 0.5),
  onMove,
  renderer = new Springy.Renderer(layout, () => {}, () => {},
    function drawNode(node, p) {
      let currentBB = layout.getBoundingBox(),
        size = currentBB.topright.subtract(currentBB.bottomleft),
        x = p.subtract(currentBB.bottomleft).divide(size.x).x,
        y = p.subtract(currentBB.bottomleft).divide(size.y).y

      if (onMove) {
        onMove({
          id: node.id,
          x: x,
          y: y
        })
      }
    }
  )

// For debug
// graph.addGraphListener({
//   graphChanged: () => console.log('Sprinfy Graph Changed', graph.edges, graph.nodes)
// })

export default function() {
  return {
    setOnMove: (func) => onMove = func,
    addNode: (id) => addNode(graph, id),
    drag: (id, x, y) => dragNode(graph, layout, id, x, y),
    addEdge: (sourceId, targeId) => addEdge(graph, sourceId, targeId),
    delEdge: (sourceId, targeId) => delEdge(graph, sourceId, targeId)
  }
}

function addNode(graph, id) {
  graph.addNode(new Springy.Node(id))
}

function addEdge(graph, sourceId, targeId) {
  graph.addEdges([sourceId, targeId])
}

function delEdge(graph, sourceId, targeId) {
  graph.filterEdges((edge) => edge.source.id !== sourceId || edge.target.id !== targeId)
}

function dragNode(graph, layout, id, x, y) {
  let currentBB = layout.getBoundingBox(),
    size = currentBB.topright.subtract(currentBB.bottomleft),
    px = x * size.x + currentBB.bottomleft.x,
    py = y * size.y + currentBB.bottomleft.y,
    draggingNodePoint = layout.point(graph.nodeSet[id])

  draggingNodePoint.p.x = px
  draggingNodePoint.p.y = py

  renderer.start()
}
