import getElementValue from './getElementValue'
import originalId from './originalId'
import originalLabel from './originalLabel'
import originalUrl from './originalUrl'
import reset from './reset'

export default function(selector) {
  let component = document.querySelector(selector),
    label = component.querySelector('.label'),
    url = component.querySelector('.url'),
    button = component.querySelector('.button')

  return {
    component: component,
    get value() {
      return {
        id: originalId.get(component),
        label: getElementValue(label),
        url: getElementValue(url)
      }
    },
    set value(value) {
      console.assert(value.id, 'id is required.')

      label.value = value.label
      url.value = value.url || ''

      originalId.set(component, value.id)

      component.classList.remove('hidden')
    },
    reset: () => {
      reset(label, url, button)
    },
    set enabled(value) {
      button.disabled = !value
    },
    hide: () => component.classList.add('hidden')
  }
}
