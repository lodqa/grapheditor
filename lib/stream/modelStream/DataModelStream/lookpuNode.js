import request from 'superagent'
import {
  target,
  actionType
}
from '../../const'

export default function(nodes, lookupUrl, push, done) {
  request
    .post(lookupUrl)
    .send(nodes.getLabels())
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
