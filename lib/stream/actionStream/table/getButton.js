export default function(element) {
  if (element.tagName === 'I') {
    return element.parentElement
  }

  return element
}
