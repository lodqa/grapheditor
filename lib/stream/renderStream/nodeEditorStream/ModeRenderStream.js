import {
  ActionTransform
}
from 'action-stream'
import {
  actionType, target
}
from '../../const'
import inputNodeComponent from '../../../view/nodeEditor/inputNodeComponent'
import editNodeComponent from '../../../view/nodeEditor/editNodeComponent'
import editEdgeComponent from '../../../view/nodeEditor/editEdgeComponent'

export default class extends ActionTransform {
  constructor(inputNode, editNode, editEdge) {
    super()
    this._inputNode = inputNodeComponent(inputNode)
    this._editNode = editNodeComponent(editNode)
    this._editEdge = editEdgeComponent(editEdge)

  }
  _transformAction(action, push) {
    if (action.target === target.VIEW_NODE) {
      handleNode(this._inputNode, this._editNode, this._editEdge, action, push)
    }

    if (action.target === target.VIEW_EDGE) {
      handleEdge(this._inputNode, this._editNode, this._editEdge, action, push)
    }
  }
}

function handleNode(inputNode, editNode, editEdge, action, push) {
  switch (action.type) {
    case actionType.SELECT:
      inputNode.hide()
      editNode.show()
      editEdge.hide()
      break
    case actionType.CANCEL:
    case actionType.UPDATE:
    case actionType.DELETE:
      reset(inputNode, editNode, editEdge)
  }
}

function handleEdge(inputNode, editNode, editEdge, action, push) {
  switch (action.type) {
    case actionType.SELECT:
      inputNode.hide()
      editNode.hide()
      editEdge.show()
      break
    case actionType.CANCEL:
    case actionType.UPDATE:
    case actionType.DETACH:
    case actionType.DELETE:
      reset(inputNode, editNode, editEdge)
  }
}

function reset(inputNode, editNode, editEdge) {
  inputNode.show()
  editNode.hide()
  editEdge.hide()
}
