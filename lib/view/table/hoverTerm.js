export default function(ractive, id, index) {
  ractive.set('hover_term', {
    text: id,
    index
  })
}
