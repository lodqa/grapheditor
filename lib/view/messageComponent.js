export default function(selector) {
  let component = document.querySelector(selector),
    warn = component.querySelector('.warn')

  return {
    warn: (message) => updateMessage(warn, message),
    reset: () => warn.innerHTML = ''
  }
}

function updateMessage(warn, message) {
  warn.innerHTML = message
}
