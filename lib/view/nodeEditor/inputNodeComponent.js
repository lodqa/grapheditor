import urlRegex from 'url-regex'
import isUrl from './isUrl'
import reset from './reset'

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
    set enabled(value) {
      button.disabled = !value
    },
    show: () => component.classList.remove('hidden'),
    hide: () => component.classList.add('hidden')
  }
}
