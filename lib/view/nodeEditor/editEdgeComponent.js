export default function(selector) {
  let component = document.querySelector(selector)

  return {
    component,
    show: () => component.classList.remove('hidden'),
    hide: () => component.classList.add('hidden')
  }
}
