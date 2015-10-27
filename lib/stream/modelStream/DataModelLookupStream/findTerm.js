import request from 'superagent'
import {
  target,
  actionType
}
from '../../const'

export default function(nodes, findTermUrl, dictionaryUrl, texts) {
  let url = findTermUrl

  if (dictionaryUrl) {
    url = `${url}?dictionary_url=${encodeURI(dictionaryUrl)}`
  }

  return new Promise((resolve, reject) => {
    request
      .post(url)
      .send({
        keywords: texts
      })
      .end((err, res) => {
        if (!err) {
          if (!res.body) {
            console.warn('lookup result is empty.', url)
            return
          }
          nodes.setMappings(res.body)

          resolve({
            target: target.VIEW_NODE,
            type: actionType.SNAPSHOT,
            data: nodes.snapshot
          })
        } else {
          console.error('lookup error!', findTermUrl, err)
          reject(err)
        }
      })
  })
}
