import delegate from 'dom-delegate'
import {
  ActionReadable
}
from 'action-stream'
import {
  actionType, target
}
from '../const'
import graphComponent from '../../view/graphComponent'

export default class extends ActionReadable {
  constructor(selector) {
    super(selector)
    this.name = 'NodeActionStream'
  }
  _bindComponent(selector, push) {
    const component = graphComponent(selector)
    const container = delegate(component.container)

    container.on('click', '.node', (e) => {
      // start drag and drop
      if (e.target.className === 'sourcePoint') {
        return
      }

      // push down delete icon
      if (isDeleteIcon(e.target)) {
        push({
          target: target.MODEL_NODE,
          type: actionType.DELETE,
          id: getNodeEvenWhenClickChildren(e.target).id
        })
        return
      }

      // click node
      push({
        target: target.MODEL_NODE,
        type: actionType.SELECT,
        id: getNodeEvenWhenClickChildren(e.target).id
      })
    })

    container.on('mouseover', '.node', (e) => {
      push({
        target: target.MODEL_NODE,
        type: actionType.HOVER,
        id: getNodeEvenWhenClickChildren(e.target).id
      })
    })

    container.on('mouseout', '.node', (e) => {
      push({
        target: target.MODEL_NODE,
        type: actionType.UNHOVER,
        id: getNodeEvenWhenClickChildren(e.target).id
      })
    })

    component.emitter
      .on('dragging', (e) => push(
        Object.assign({
          target: target.LAYOUT_NODE,
          type: actionType.DRAG
        }, e)
      ))
  }
}

function isDeleteIcon(el) {
  // delete icon has children node
  // ex: <div class="deleteIcon"><i class="fa fa-trash-o"></i></div>
  return el.className === 'deleteIcon' || el.parentNode.className === 'deleteIcon'
}

// Even when you click a child element, you also get the element of the node.
function getNodeEvenWhenClickChildren(el) {
  const node = el.closest('.node')

  console.assert(node, 'node is not found', el)
  return node
}
