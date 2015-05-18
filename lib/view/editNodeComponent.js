import urlRegex from 'url-regex'

const URL_REGEX = urlRegex({
  exact: true
})

export default function(selector) {
  let component = document.querySelector(selector),
    label = component.querySelector('.label'),
    url = component.querySelector('.url'),
    button = component.querySelector('.button'),
    cancel = component.querySelector('.cancel-button')

  return {
    label: label,
    url: url,
    button: button,
    get value() {
      return {
        label: label.value.trim(),
        url: url.value.trim(),
        id: component.getAttribute('date-selected-id')
      }
    },
    set value(value) {
      label.value = value.label
      url.value = value.url
      component.setAttribute('date-selected-id', value.id)
    },
    reset: () => {
      reset(label, url, button)
      component.removeAttribute('date-selected-id')
    },
    updateDisable: () => updateDisable(label, url, button)
  }
}

function reset(label, url, button) {
  label.value = ''
  url.value = ''
  button.disabled = true
}

function updateDisable(label, url, button) {
  let isUrl = URL_REGEX.test(url.value.trim())
  button.disabled = !label.value || !isUrl
}
