import gulp from 'gulp'
import connect from 'gulp-connect'

gulp.task('connect', () => connect.server({
  port: 9292,
  middleware: (connect, opt) => {
    return [
      (req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*')
        return next()
      }, (req, res, next) => {
        if (req.method === 'OPTIONS') {
          res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
          res.end()
        }
        return next()
      }, (req, res, next) => {
        if (req.method === 'POST') {
          let response = {
            "genes": ["http://www4.wiwiss.fu-berlin.de/diseasome/resource/diseasome/genes"],
            "alzheimer disease": ["http://www4.wiwiss.fu-berlin.de/diseasome/resource/diseases/74"],
            "bing": ["http://example.com/bing", "text:bing"]
          }

          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(response))
        }
        return next()
      }
    ]
  }
}))

gulp.task('default', ['connect'])
