var editor = graphEditor('http://localhost:9292/lookup')

// Add default nodes.
editor.addNodes([{
  id: 'node-1',
  label: 'genes'
}, {
  id: 'node-2',
  label: 'alzheimer disease'
}, {
  id: 'node-3',
  label: 'bing'
}, {
  id: 'node-4',
  label: 'bang'
}, {
  id: 'node-5',
  label: 'bong'
}, {
  id: 'node-6',
  label: 'song'
}])

// Add default edges.
editor.addEdges([{
  sourceId: 'node-1',
  targetId: 'node-2',
  label: 'path1'
}, {
  sourceId: 'node-1',
  targetId: 'node-3',
  label: 'path2'
}, {
  sourceId: 'node-1',
  targetId: 'node-4',
  label: 'path3'
}, {
  sourceId: 'node-1',
  targetId: 'node-5',
  label: 'path4'
}, {
  sourceId: 'node-3',
  targetId: 'node-6',
  label: 'path5'
}])
