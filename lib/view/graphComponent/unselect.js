export default function(container, selector) {
  Array.from(container.querySelectorAll(selector))
    .forEach(el => el.classList.remove('selected'))
}