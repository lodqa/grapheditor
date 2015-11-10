import request from './request'

export default function(findTermUrl, dictionaryUrl, texts) {
  let url = findTermUrl

  if (dictionaryUrl) {
    url = `${url}?dictionary_url=${encodeURI(dictionaryUrl)}`
  }

  return request
    .post(url)
    .send({
      keywords: texts
    })
    .end()
    .then((res) => res.body)
}
