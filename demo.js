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
  label: 'song',
  createEdge: 'chain'
}])
