import getElementValue from './getElementValue'
import originalId from './originalId'
import originalLabel from './originalLabel'
import originalUrl from './originalUrl'
import reset from './reset'

export default function(selector) {
  let component = document.querySelector(selector),
    label = component.querySelector('.label'),
    url = component.querySelector('.url'),
    button = component.querySelector('.button'),
    resetItem = () => reset(label, button)

  return {
    component: component,
    get value() {
      return {
        id: originalId.get(component)
      }
    },
    set value(value) {
      console.assert(value.id, 'id is required.')

      originalId.set(component, value.id)
    },
    reset: resetItem,
    show: () => {
      resetItem()
      component.classList.remove('hidden')
    },
    hide: () => component.classList.add('hidden')
  }
}
