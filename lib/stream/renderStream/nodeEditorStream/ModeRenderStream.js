import {
  ActionTransform
}
from 'action-stream'
import {
  actionType, target
}
from '../../const'
import inputNodeComponent from '../../../view/nodeEditor/inputNodeComponent'
import editEdgeComponent from '../../../view/nodeEditor/editEdgeComponent'

export default class extends ActionTransform {
  constructor(inputNodeSelector, editEdgeSelector) {
    super()
    let inputNode = inputNodeComponent(inputNodeSelector),
      editEdge = editEdgeComponent(editEdgeSelector)

    this.bindActions(
      target.VIEW_EDGE, [
        [actionType.SELECT, (action, push) => showEditEdge(inputNode, editEdge)],
        [actionType.UNSELECT, (action, push) => reset(inputNode, editEdge)]
      ])
  }
}

function reset(inputNode, editEdge) {
  inputNode.show()
  editEdge.hide()
}

function showEditEdge(inputNode, editEdge) {
  inputNode.hide()
  editEdge.show()
}
