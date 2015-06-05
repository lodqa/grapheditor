import urlRegex from 'url-regex'

const URL_REGEX = urlRegex({
  exact: true
})

export default function(url) {
  return URL_REGEX.test(url.trim())
}
