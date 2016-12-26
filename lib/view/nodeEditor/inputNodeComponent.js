import reset from './reset'

export default function(selector) {
  let component = document.querySelector(selector),
    text = component.querySelector('input'),
    button = component.querySelector('button'),
    resetItem = () => reset(text, button)

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
