var editor = graphEditor()

// Add default nodes.
editor.addNodes([{
  label: 'google',
  url: 'http://google.com'
}, {
  label: 'yahoo',
  url: 'http://yahoo.com'
}, {
  label: 'bing',
  url: 'http://bing.com'
}, {
  label: 'bang',
  url: 'http://bang.com'
}, {
  label: 'bong',
  url: 'http://bong.com'
}, {
  label: 'song',
  url: 'http://song.com'
}])

// Add default edges.
editor.addEdges([{
  sourceUrl: 'http://google.com',
  targetUrl: 'http://yahoo.com',
  label: 'path1',
  url: 'http://github.com/path1'
}, {
  sourceUrl: 'http://google.com',
  targetUrl: 'http://bing.com',
  label: 'path2',
  url: 'http://path2.com'
}, {
  sourceUrl: 'http://google.com',
  targetUrl: 'http://bang.com',
  label: 'path3',
  url: 'http://path3.com'
}, {
  sourceUrl: 'http://google.com',
  targetUrl: 'http://bong.com',
  label: 'path4',
  url: 'http://path4.com'
}, {
  sourceUrl: 'http://bing.com',
  targetUrl: 'http://song.com',
  label: 'path5',
  url: 'http://path5.com'
}])
