import urlRegex from 'url-regex'
import getElementValue from './getElementValue'

const URL_REGEX = urlRegex({
  exact: true
})

export default function(url) {
  return URL_REGEX.test(getElementValue(url))
}
