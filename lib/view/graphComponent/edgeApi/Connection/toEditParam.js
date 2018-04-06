import toOverlayPalameter from '../toOverlayPalameter'

export default function toEditParam(label) {
  return toOverlayPalameter('edit', `
    <div class="edgeEdit">
      <input value="${label}"></input>
      <div class="deleteIcon"><i class="far fa-trash-alt"></i></div>
    </div>`)
}
