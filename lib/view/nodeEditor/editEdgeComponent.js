import attr from './attr'

let sourceId = attr('data-original-source-id'),
  targetId = attr('data-original-target-id')

export default function(selector) {
  let component = document.querySelector(selector)

  return {
    component: component,
    get value() {
      return {
        sourceId: sourceId.get(component),
        targetId: targetId.get(component)
      }
    },
    set value(value) {
      console.assert(value.sourceId, 'sourceId is required.')
      console.assert(value.targetId, 'targetId is required.')

      sourceId.set(component, value.sourceId)
      targetId.set(component, value.targetId)
    },
    show: () => component.classList.remove('hidden'),
    hide: () => component.classList.add('hidden')
  }
}
