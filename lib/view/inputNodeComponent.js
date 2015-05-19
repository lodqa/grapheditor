import urlRegex from 'url-regex'

const URL_REGEX = urlRegex({
  exact: true
})

export default function(selector) {
  let component = document.querySelector(selector),
    label = component.querySelector('.label'),
    url = component.querySelector('.url'),
    button = component.querySelector('.button')

  return {
    component: component,
    get value() {
      return {
        label: label.value.trim(),
        url: url.value.trim()
      }
    },
    reset: () => reset(label, url, button),
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
