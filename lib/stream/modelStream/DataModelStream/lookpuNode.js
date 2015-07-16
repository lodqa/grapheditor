import request from 'superagent'
import {
  target,
  actionType
}
from '../../const'

export default function(nodes, lookupUrl, labels, done) {
  request
    .post(lookupUrl)
    .send(labels)
    .end((err, res) => {
      if (!err) {
        nodes.setUrl(res.body)

        done({
          target: target.VIEW_NODE,
          type: actionType.SNAPSHOT,
          nodes: nodes.toArray()
        })
      } else {
        console.error('lookup error!', lookupUrl, err)
      }
    })
}
