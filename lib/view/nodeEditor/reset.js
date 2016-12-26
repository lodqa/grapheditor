export default function(inputText, button) {
  if (inputText) {
    inputText.value = ''
  }

  if (button) {
    button.disabled = true
  }
}
