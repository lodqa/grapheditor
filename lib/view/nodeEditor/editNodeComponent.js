import getElementValue from './getElementValue'
import attr from './attr'
import originalLabel from './originalLabel'
import isChange from './isChange'
import reset from './reset'

let selectedId = attr('date-selected-id'),
  targetId = attr('date-target-id')

export default function(selector) {
  let component = document.querySelector(selector),
    label = component.querySelector('.label'),
    button = component.querySelector('.button'),
    resetItem = () => reset(label, button)

  return {
    component: component,
    get value() {
      return {
        label: getElementValue(label),
        id: selectedId.get(component)
      }
    },
    set value(value) {
      label.value = value.label
      originalLabel.set(component, value.label)
      selectedId.set(component, value.id)
    },
    reset: () => {
      resetItem()
      selectedId.del(component)
    },
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
