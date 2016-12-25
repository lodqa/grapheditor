/* globals graphEditor*/
const editor = graphEditor('http://localhost:9292/termfinder')

editor.addPgp({
  nodes: {
    'node-1': {
      text: 'genes'
    },
    'node-2': {
      text: 'alzheimer disease'
    },
    'node-3': {
      text: 'bing'
    },
    'node-4': {
      text: 'bang'
    },
    'node-5': {
      text: 'bong'
    },
    'node-6': {
      text: 'song'
    }
  },
  edges: [{
    object: 'node-2',
    subject: 'node-1',
    text: 'hoge'
  }, {
    object: 'node-3',
    subject: 'node-1'
  }, {
    object: 'node-4',
    subject: 'node-1'
  }, {
    object: 'node-5',
    subject: 'node-1'
  }, {
    object: 'node-6',
    subject: 'node-5'
  }],
  focus: 'node-2'
})

editor.setDictionaryUrl('http://pubdictionaries.org/find_ids.json?dictionary=DrugBank-QALD,SIDER-QALD,Diseasome-QALD&threshold=0.55')
