import ActionTransform from '../../ActionTransform'
import inputNodeComponent from '../../../view/inputNodeComponent'
import editNodeComponent from '../../../view/editNodeComponent'
import editEdgeComponent from '../../../view/editEdgeComponent'

export default class extends ActionTransform {
  constructor(inputNode, editNode, editEdge) {
    super()
    this._inputNode = inputNodeComponent(inputNode)
    this._editNode = editNodeComponent(editNode)
    this._editEdge = editEdgeComponent(editEdge)

  }
  _transformAction(action, push) {
    if (action.target === 'node') {
      handleNode(this._inputNode, this._editNode, this._editEdge, action, push)
    }

    if (action.target === 'edge') {
      handleEdge(this._inputNode, this._editNode, this._editEdge, action, push)
    }
  }
}

function handleNode(inputNode, editNode, editEdge, action, push) {
  switch (action.type) {
    case 'create':
      break
    case 'select':
      inputNode.hide()
      editNode.value = action
      editEdge.hide()
      break
    case 'unselect':
      reset(inputNode, editNode, editEdge)
  }
}

function handleEdge(inputNode, editNode, editEdge, action, push) {
  switch (action.type) {
    case 'afterCreate':
      inputNode.hide()
      editNode.hide()
      editEdge.value = action
      break
    case 'detach':
      reset(inputNode, editNode, editEdge)
  }
}

function reset(inputNode, editNode, editEdge) {
  inputNode.show()
  editNode.hide()
  editEdge.hide()
}
