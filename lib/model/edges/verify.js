import isUrl from '../isUrl'
import toEdgeId from './toEdgeId'

export default function(edges, nodes, action) {
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

  let old = edges.get(action.id)
  if (!isChange(old, action))
    return {
      isValid: false,
      reason: 'no change.'
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
