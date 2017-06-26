import Springy from 'springy'

// Singleton.
const graph = new Springy.Graph()
const layout = new Springy.Layout.ForceDirected(graph, 400.0, 400.0, 0.5)
const renderer = new Springy.Renderer(layout, () => {}, () => {}, drawNode)

let onMove

// For debug
// graph.addGraphListener({
//   graphChanged: () => console.log('Sprinfy Graph Changed', graph.edges, graph.nodes)
// })

export default function() {
  return {
    setOnMove: (func) => (onMove = func),
    addNode: (id) => addNode(graph, id),
    drag: (id, x, y) => dragNode(graph, layout, id, x, y),
    addEdge: (sourceId, targeId) => addEdge(graph, sourceId, targeId),
    delEdge: (sourceId, targeId) => delEdge(graph, sourceId, targeId),
    delNode: (id) => delNode(graph, id)
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

function delNode(graph, id) {
  graph.filterNodes((node) => node.id !== id)
}

function dragNode(graph, layout, id, x, y) {
  const currentBB = layout.getBoundingBox()
  const size = currentBB.topright.subtract(currentBB.bottomleft)
  const px = x * size.x + currentBB.bottomleft.x
  const py = y * size.y + currentBB.bottomleft.y
  const draggingNodePoint = layout.point(graph.nodeSet[id])

  draggingNodePoint.p.x = px
  draggingNodePoint.p.y = py

  renderer.start()
}

function drawNode(node, p) {
  const currentBB = layout.getBoundingBox()
  const size = currentBB.topright.subtract(currentBB.bottomleft)
  const x = p.subtract(currentBB.bottomleft)
    .divide(size.x)
    .x
  const y = p.subtract(currentBB.bottomleft)
    .divide(size.y)
    .y

  if (onMove) {
    onMove({
      id: node.id,
      x,
      y
    })
  }
}
