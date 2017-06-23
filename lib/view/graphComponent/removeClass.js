export default function(container, selector, className, excludeId) {
  Array.from(container.querySelectorAll(selector))
    .filter((el) => el.id !== excludeId)
    .forEach((el) => el.classList.remove(className))
}
