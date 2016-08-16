export default function(selector) {
  const component = document
    .querySelector(selector)
    .querySelector('.placeholder')

  if (!component) {
    throw new Error(`No dom is find by selector: '${selector}'`)
  }

  return {
    component,
    set(texts) {
      showPlaceholder(component, texts)
    }
  }
}

function showPlaceholder(component, data) {
  if (data.list.length === 0) {
    component.classList.remove('hidden')
  } else {
    component.classList.add('hidden')
  }
}
