import urlRegex from 'url-regex'

const URL_REGEX = urlRegex({
  exact: true
})

export default function(selector) {
  let component = document.querySelector(selector),
    label = component.querySelector('.label'),
    url = component.querySelector('.url'),
    button = component.querySelector('.button'),
    warn = component.querySelector('.warn')

  return {
    name: Date.now(),
    label: label,
    url: url,
    button: button,
    get value() {
      let ret = {
          label: label.value.trim(),
          url: url.value.trim()
        },
        selectedId = component.getAttribute('date-selected-id')

      if (selectedId)
        ret.id = selectedId

      return ret
    },
    set value(value) {
      label.value = value.label
      url.value = value.url
      component.setAttribute('date-selected-id', value.id)
    },
    get isExistNode() {
      return component.getAttribute('date-selected-id')
    },
    reset: () => {
      reset(label, url, button, warn)
      component.removeAttribute('date-selected-id')
    },
    updateDisable: () => updateDisable(label, url, button),
    warn: (message) => updateMessage(warn, message)
  }
}

function reset(label, url, button, warn) {
  label.value = ''
  url.value = ''
  button.disabled = true
  warn.innerHTML = ''
}

function updateDisable(label, url, button) {
  let isUrl = URL_REGEX.test(url.value.trim())
  button.disabled = !label.value || !isUrl
}

function updateMessage(warn, message) {
  warn.innerHTML = message
}
