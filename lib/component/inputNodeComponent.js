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
    label: label,
    url: url,
    button: button,
    get value() {
      return {
        label: label.value.trim(),
        url: url.value.trim()
      }
    },
    reset: () => {
      label.value = ''
      url.value = ''
      button.disabled = true
      warn.innerHTML = ''
    },
    updateDisable: () => {
      let isUrl = URL_REGEX.test(url.value.trim())

      button.disabled = !label.value || !isUrl
    },
    duplicateUrl: (url) => warn.innerHTML = `${url} exists already.`
  }
}
