export default function(selector) {
  let component = document.querySelector(selector),
    label = component.querySelector('.label'),
    url = component.querySelector('.url'),
    button = component.querySelector('.button')

  return {
    label: label,
    url: url,
    button: button,
    get value() {
      return {
        label: label.value,
        url: url.value
      }
    },
    reset: () => {
      label.value = ''
      url.value = ''
      button.disabled = true
    },
    updateDisable: () => button.disabled = !label.value || !url.value
  }
}
