import request from 'superagent'

export default function(findTermUrl, dictionaryUrl, texts) {
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
          resolve(res.body)
        } else {
          console.error('find term error!', findTermUrl, err)
          reject(err)
        }
      })
  })
}
