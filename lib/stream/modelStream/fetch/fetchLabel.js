import request from './request'

export default function(endpoint, url) {
  const query = `select ?label where { <${url}>  rdfs:label ?label }`,
    // encodeURI does not encode #.
    requestUrl = `${endpoint}?query=${encodeURIComponent(query) }`

  return request
    .get(requestUrl)
    .set('Accept', 'application/json')
    .end()
    .then((res) => res.body)
    .then((result) => {
      if (result.results.bindings[0]) {
        return result.results.bindings[0].label.value
      }
    })
}
