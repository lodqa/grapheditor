export default function(selector) {
  const component = document
    .querySelector(selector)
    .querySelector('.message')

  return {
    update(message) {
      updateMessage(component, message)
    },
    reset() {
      component.innerHTML = ''
    }
  }
}

function updateMessage(component, message) {
  component.innerHTML = message
}
