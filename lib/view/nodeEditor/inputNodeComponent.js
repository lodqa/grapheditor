import reset from './reset'

export default function(selector) {
  const component = document.querySelector(selector)
  const text = component.querySelector('input')
  const button = component.querySelector('button')
  const resetItem = () => reset(text, button)

  return {
    component,
    get value() {
      return {
        text: text.value.trim(),
        createEdge: component.querySelector('[type="radio"]:checked').value
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
