import request from './request'

export default function(endpoint, proxy, url) {
  const query = `select ?label where { <${url}>  rdfs:label ?label }`

  // encodeURI does not encode #.
  let requestUrl = `${endpoint}?query=${encodeURIComponent(query)}`

  if (proxy) {
    requestUrl = `${proxy}?endpoint=${endpoint}&query=${encodeURIComponent(query)}`
  }

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
    .catch((err) => {
      console.error(`error: ${err.stack}
requestUrl: ${requestUrl}
url of endpoint: ${endpoint}
url of term: ${url}
sparql query: ${query}`)
    })
}
