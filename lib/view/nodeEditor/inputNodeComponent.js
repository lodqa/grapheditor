import reset from './reset'

export default function(selector) {
  let component = document.querySelector(selector),
    label = component.querySelector('.label'),
    button = component.querySelector('.button'),
    resetItem = () => reset(label, button)

  return {
    component: component,
    get value() {
      return {
        label: label.value.trim()
      }
    },
    reset: resetItem,
    set enabled(value) {
      button.disabled = !value
    },
    show: () => {
      resetItem()
      component.classList.remove('hidden')
    },
    hide: () => component.classList.add('hidden')
  }
}
