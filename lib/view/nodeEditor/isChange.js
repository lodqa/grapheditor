import originalLabel from './originalLabel'
import originalUrl from './originalUrl'
import getElementValue from './getElementValue'

export default function(label, url, component) {
  return originalLabel.get(component) != getElementValue(label) ||
    originalUrl.get(component) !== getElementValue(url)
}
