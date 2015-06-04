import ActionTransform from '../ActionTransform'
import {
  actionType, target
}
from '../const'

export default class extends ActionTransform {
  constructor() {
    super()

  }
  _transformAction(action, push) {
    if (action.target === target.MODEL_NODE) {
      handleNode(action, push)
    }

    if (action.target === target.MODEL_EDGE) {
      handleEdge(action, push)
    }
  }
}

function handleNode(action, push) {
  switch (action.type) {
    case actionType.CANCEL:
    case actionType.UPDATE:
      pushUnselect(push, target.MODEL_NODE)
      break
    case actionType.SELECT:
      pushUnselect(push, target.MODEL_EDGE)
  }
}

function handleEdge(action, push) {
  switch (action.type) {
    case actionType.AFTER_CREATE:
    case actionType.SELECT:
      pushUnselect(push, target.MODEL_NODE)
      break
    case actionType.DETACH:
    case actionType.CANCEL:
    case actionType.UPDATE:
      pushUnselect(push, target.MODEL_EDGE)

  }
}

function pushUnselect(push, target) {
  push({
    target: target,
    type: actionType.UNSELECT
  })
}
