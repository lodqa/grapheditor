import request from 'superagent'
import Promise from 'bluebird'
import {
  target,
  actionType
}
from '../../const'

export default function(nodes, lookupUrl, labels) {
  return new Promise((resolve, reject) => {
    request
      .post(lookupUrl)
      .send(labels)
      .end((err, res) => {
        if (!err) {
          nodes.setUrl(res.body)

          resolve({
            target: target.VIEW_NODE,
            type: actionType.SNAPSHOT,
            data: nodes.snapshot
          })
        } else {
          console.error('lookup error!', lookupUrl, err)
          reject(err)
        }
      })
  })
}
