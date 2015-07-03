export default function(edges, action) {
  let old = edges.get(action.id)
  // update?
  if (old && !isChange(old, action))
    return {
      isValid: false,
      reason: 'no change.'
    }

  if (!action.label)
    return {
      isValid: false,
      reason: 'no label.'
    }

  return {
    isValid: true
  }
}

function isChange(old, action) {
  return old.label !== action.label || old.url !== action.url
}
