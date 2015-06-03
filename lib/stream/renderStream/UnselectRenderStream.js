import ActionTransform from '../ActionTransform'
import actionType from '../actionType'

export default class extends ActionTransform {
  constructor() {
    super()

  }
  _transformAction(action, push) {
    if (action.target === 'node') {
      handleNode(action, push)
    }

    if (action.target === 'edge') {
      handleEdge(action, push)
    }
  }
}

function handleNode(action, push) {
  switch (action.type) {
    case actionType.CANCEL:
    case actionType.UPDATE:
      pushUnselect(push, 'node')
      break
    case actionType.SELECT:
      pushUnselect(push, 'edge')
  }
}

function handleEdge(action, push) {
  switch (action.type) {
    case 'afterCreate':
    case actionType.SELECT:
      pushUnselect(push, 'node')
      break
    case actionType.DETACH:
    case actionType.CANCEL:
    case actionType.UPDATE:
      pushUnselect(push, 'edge')

  }
}

function pushUnselect(push, target) {
  push({
    target: target,
    type: actionType.UNSELECT
  })
}
