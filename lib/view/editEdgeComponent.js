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
        label: getValue(label),
        url: getValue(url),
        sourceId: getSoruceId(component),
        targetId: getTargetId(component)
      }
    },
    set value(value) {
      label.value = value.label.label
      url.value = value.url || ''
      component.setAttribute('data-original-label', value.label)
      component.setAttribute('data-original-url', value.url)
      component.setAttribute('date-source-id', value.sourceId)
      component.setAttribute('date-target-id', value.targetId)
      component.classList.remove('hidden')
    },
    reset: () => {
      reset(label, url, button)
      component.removeAttribute('date-source-id')
      component.removeAttribute('date-target-id')
    },
    updateDisable: () => updateDisable(label, url, button, component),
    hide: () => component.classList.add('hidden')
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
    !getSoruceId(component) ||
    !getTargetId(component) ||
    getOriginalLabel(component) === getValue(label) ||
    getOriginalUrl(component) === getValue(url)
}

function getValue(url) {
  return url.value.trim()
}

function getSoruceId(component) {
  return component.getAttribute('date-selected-id')
}

function getTargetId(component) {
  return component.getAttribute('date-target-id')
}

function getOriginalLabel(component) {
  return component.getAttribute('data-original-label')
}

function getOriginalUrl(component) {
  return component.getAttribute('data-original-url')
}
