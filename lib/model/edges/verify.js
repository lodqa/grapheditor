import isUrl from '../isUrl'

export default function(edges, nodes, action) {
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

  if (!action.url)
    return {
      isValid: false,
      reason: 'no url.'
    }

  if (!isUrl(action.url))
    return {
      isValid: false,
      reason: 'url is no URL.'
    }

  return {
    isValid: true
  }
}

function isChange(old, action) {
  return old.label !== action.label || old.url !== action.url
}
