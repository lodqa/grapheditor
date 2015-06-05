import getElementValue from './getElementValue'
import attr from './attr'
import isUrl from './isUrl'
import originalLabel from './originalLabel'
import originalUrl from './originalUrl'
import isChange from './isChange'
import reset from './reset'

let selectedId = attr('date-selected-id'),
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
        id: selectedId.get(component)
      }
    },
    set value(value) {
      label.value = value.label
      url.value = value.url
      originalLabel.set(component, value.label)
      originalUrl.set(component, value.url)
      selectedId.set(component, value.id)
      component.classList.remove('hidden')
    },
    reset: () => {
      reset(label, url, button)
      selectedId.del(component)
    },
    set enabled(value) {
      button.disabled = !value
    },
    hide: () => component.classList.add('hidden')
  }
}
