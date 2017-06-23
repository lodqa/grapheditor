import removeClass from './removeClass'

export default function(container, selector, excludeId) {
  removeClass(container, selector, 'selected')
  removeClass(container, selector, 'editing', excludeId)
}
