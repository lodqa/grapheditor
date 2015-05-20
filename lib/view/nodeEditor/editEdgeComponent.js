import getElementValue from './getElementValue'
import attr from './attr'
import isUrl from './isUrl'
import originalLabel from './originalLabel'
import originalUrl from './originalUrl'
import isChange from './isChange'
import reset from './reset'

let sourceId = attr('date-source-id'),
  targetId = attr('date-target-id')

export default function(selector) {
  let component = document.querySelector(selector),
    label = component.querySelector('.label'),
    url = component.querySelector('.url'),
    button = component.querySelector('.button')

  return {
    component: component,
    get value() {
      return {
        label: getElementValue(label),
        url: getElementValue(url),
        sourceId: sourceId.get(component),
        targetId: targetId.get(component)
      }
    },
    set value(value) {
      label.value = value.label
      url.value = value.url || ''

      originalLabel.set(component, value.label)
      originalUrl.set(component, value.url)
      sourceId.set(component, value.sourceId)
      targetId.set(component, value.targetId)
      component.classList.remove('hidden')
    },
    reset: () => {
      reset(label, url, button)
      sourceId.del(component)
      targetId.del(component)
    },
    updateDisable: () => updateDisable(label, url, button, component),
    hide: () => component.classList.add('hidden')
  }
}

function updateDisable(label, url, button, component) {
  button.disabled = !label.value ||
    !isUrl(url) ||
    !sourceId.get(component) ||
    !targetId.get(component) ||
    !isChange(label, url, component)
}
