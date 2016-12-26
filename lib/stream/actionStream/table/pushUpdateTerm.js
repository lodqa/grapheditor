import {
  actionType
}
from '../../const'

export default function(target, id, terms, push) {
  push({
    type: actionType.UPDATE_TERM,
    target,
    id,
    terms
  })
}
