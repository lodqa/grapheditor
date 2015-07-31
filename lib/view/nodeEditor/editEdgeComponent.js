import attr from './attr'

let sourceId = attr('data-original-source-id'),
  targetId = attr('data-original-target-id')

export default function(selector) {
  let component = document.querySelector(selector)

  return {
    show: () => component.classList.remove('hidden'),
    hide: () => component.classList.add('hidden')
  }
}
