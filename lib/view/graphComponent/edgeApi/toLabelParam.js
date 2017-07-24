import toOverlayPalameter from './toOverlayPalameter'

export default function(label, selected = false) {
  return toOverlayPalameter('label', `
    <div class="edgeLabel ${label ? '' : 'no-text'} ${selected ? 'selected' : ''}">
      <div class="name">${label}</div>
      <div class="editIcon"><i class="fa fa-pencil"></i></div>
      <div class="deleteIcon"><i class="fa fa-trash-o"></i></div>
    </div>`)
}
