import ActionTransform from '../ActionTransform'

export default class extends ActionTransform {
  constructor() {
    super()

  }
  _transformAction(action, push) {
    push(action)

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
    case 'cancel':
    case 'update':
      pushUnselect(push, 'node')
      break
    case 'select':
      pushUnselect(push, 'edge')
  }
}

function handleEdge(action, push) {
  switch (action.type) {
    case 'afterCreate':
    case 'select':
      pushUnselect(push, 'node')
      break
    case 'detach':
    case 'cancel':
    case 'update':
      pushUnselect(push, 'edge')

  }
}

function pushUnselect(push, target) {
  push({
    target: target,
    type: 'unselect'
  })
}
