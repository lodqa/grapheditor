export default function(container, selector, className) {
  Array.from(container.querySelectorAll(selector))
    .forEach((el) => el.classList.remove(className))
}
