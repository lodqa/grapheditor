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
      editEdge = editEdgeComponent(editEdgeSelector),
      resetComponet = (action, push) => reset(inputNode, editEdge)

    this.bindActions(target.VIEW_NODE, [
      [actionType.DELETE, resetComponet],
      [actionType.SELECT, resetComponet]
    ])

    this.bindActions(target.VIEW_EDGE, [
      [actionType.CANCEL, resetComponet],
      [actionType.DELETE, resetComponet],
      [actionType.SELECT, (action, push) => {
        inputNode.hide()
        editEdge.show()
      }]
    ])
  }
}

function reset(inputNode, editEdge) {
  inputNode.show()
  editEdge.hide()
}
