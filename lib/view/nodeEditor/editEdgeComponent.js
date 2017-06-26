export default function(selector) {
  const component = document.querySelector(selector)

  return {
    component,
    show: () => component.classList.remove('hidden'),
    hide: () => component.classList.add('hidden')
  }
}
