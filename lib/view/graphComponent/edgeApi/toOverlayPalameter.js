export default function(id, innerHTML) {
  return ['Custom', {
    create() {
      const el = document.createElement('div')

      el.innerHTML = innerHTML
      return el
    },
    id
  }]
}
