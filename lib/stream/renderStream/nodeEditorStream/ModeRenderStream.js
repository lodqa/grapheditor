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
  constructor(inputNodeSelector, editNodeSelector, editEdgeSelector) {
    super()
    let inputNode = inputNodeComponent(inputNodeSelector),
      editNode = editNodeComponent(editNodeSelector),
      editEdge = editEdgeComponent(editEdgeSelector),
      resetComponet = (action, push) => reset(inputNode, editNode, editEdge)

    this.bindActions(target.VIEW_NODE, [
      [actionType.CANCEL, resetComponet],
      [actionType.DELETE, resetComponet],
      [actionType.SELECT, (action, push) => {
        inputNode.hide()
        editNode.show()
        editEdge.hide()
      }],
      [actionType.UPDATE, resetComponet]
    ])

    this.bindActions(target.VIEW_EDGE, [
      [actionType.CANCEL, resetComponet],
      [actionType.DELETE, resetComponet],
      [actionType.DETACH, resetComponet],
      [actionType.SELECT, (action, push) => {
        inputNode.hide()
        editNode.hide()
        editEdge.show()
      }],
      [actionType.UPDATE, resetComponet],
    ])
  }
}

function reset(inputNode, editNode, editEdge) {
  inputNode.show()
  editNode.hide()
  editEdge.hide()
}
