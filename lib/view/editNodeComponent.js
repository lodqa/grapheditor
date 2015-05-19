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
        label: getValue(label),
        url: getValue(url),
        id: getSelectedId(component)
      }
    },
    set value(value) {
      label.value = value.label
      url.value = value.url
      component.setAttribute('data-original-url', value.url)
      component.setAttribute('date-selected-id', value.id)
    },
    reset: () => {
      reset(label, url, button)
      component.removeAttribute('date-selected-id')
    },
    updateDisable: () => updateDisable(label, url, button, component)
  }
}

function reset(label, url, button) {
  label.value = ''
  url.value = ''
  button.disabled = true
}

function updateDisable(label, url, button, component) {
  let isUrl = URL_REGEX.test(getValue(url))

  button.disabled = !label.value ||
    !isUrl ||
    !getSelectedId(component) ||
    getOriginalUrl(component) === getValue(url)
}

function getValue(url) {
  return url.value.trim()
}

function getSelectedId(component) {
  return component.getAttribute('date-selected-id')
}

function getOriginalUrl(component) {
  return component.getAttribute('data-original-url')
}
