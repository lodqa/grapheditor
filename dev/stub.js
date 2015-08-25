import http from 'http'
import connect from 'connect'
import bodyParser from 'body-parser'

const MAPPINGS_MASTER = {
  "genes": ["http://www4.wiwiss.fu-berlin.de/diseasome/resource/diseasome/genes"],
  "alzheimer disease": ["http://www4.wiwiss.fu-berlin.de/diseasome/resource/diseases/74"],
  "bing": ["http://example.com/bing", "text:bing"]
}

let app = connect()
  .use(bodyParser.json())
  .use((req, res, next) => {
    // For source is file://
    res.setHeader('Access-Control-Allow-Origin', '*')
    return next()
  })
  .use((req, res, next) => {
    // For Preflight
    if (req.method === 'OPTIONS') {
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
      res.end()
    }
    return next()
  }).use((req, res, next) => {
    if (req.method === 'POST') {
      // Return matched mappings only.
      let response = req.body.reduce((mappings, label) => {
        if (MAPPINGS_MASTER[label]) {
          mappings[label] = MAPPINGS_MASTER[label]
        } else {
          mappings[label] = []
        }

        return mappings
      }, {})

      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify(response))
    }
    return next()
  })

http.createServer(app)
  .listen(9292)
