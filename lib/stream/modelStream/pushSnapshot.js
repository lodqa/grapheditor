import {
  actionType
}
from '../const'

export default function(push, model, target) {
  push({
    target,
    type: actionType.SNAPSHOT,
    data: model.snapshot
  })
}
