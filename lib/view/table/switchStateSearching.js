export default function(component, isSearching) {
  if (isSearching) {
    for (const el of component.querySelectorAll('.find-term')) {
      el.children[0].classList.remove('fa-search')
      el.children[0].classList.add('fa-spinner')
      el.children[0].classList.add('fa-spin')
    }
  } else {
    for (const el of component.querySelectorAll('.find-term')) {
      el.children[0].classList.add('fa-search')
      el.children[0].classList.remove('fa-spinner')
      el.children[0].classList.remove('fa-spin')
    }
  }

  for (const el of component.querySelectorAll('.find-term')) {
    el.disabled = isSearching
  }
}
