import request from 'superagent'
import Promise from 'bluebird'
import {
  target,
  actionType
}
from '../../const'

export default function(nodes, lookupUrl, dictionaryUrl, labels) {
  let url = lookupUrl

  if (dictionaryUrl) {
    url = `${url}?dictionary_url=${encodeURI(dictionaryUrl)}`
  }

  return new Promise((resolve, reject) => {
    request
      .post(url)
      .send({
        keywords: labels
      })
      .end((err, res) => {
        if (!err) {
          if (!res.body) {
            console.warn('lookup result is empty.', url)
            return
          }
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
