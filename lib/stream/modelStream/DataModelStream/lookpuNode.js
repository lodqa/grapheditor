import request from 'superagent'
import {
  target,
  actionType
}
from '../../const'

export default function(nodes, lookupUrl, push, done) {
  let labels = nodes.getLabels().join('_'),
    url = `${lookupUrl}?query=${labels}`

  request
    .get(url)
    .end((err, res) => {
      if (!err) {
        nodes.setUrl(res.body)

        done({
          target: target.VIEW_NODE,
          type: actionType.SNAPSHOT,
          nodes: nodes.taArray()
        })
      } else {
        console.error('lookup error!', url, err)
      }
    })
}
