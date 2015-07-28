import reset from './reset'
import attr from './attr'

let originalId = attr('data-original-id')

export default function(selector) {
  let component = document.querySelector(selector),
    button = component.querySelector('.button'),
    resetItem = () => reset(null, button)

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
