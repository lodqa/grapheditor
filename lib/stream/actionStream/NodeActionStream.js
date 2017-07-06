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
      // exclude events of children elements
      // start drag and drop
      // push down edit icon
      // push down delete icon
      if (e.target.className === 'sourcePoint' || isEditIcon(e.target) || isDeleteIcon(e.target)) {
        return
      }

      selectNode(e.target, push)
    })

    // push down edit icon
    container.on('click', '.node .editIcon', () => startEdit(push))

    // push down delete icon
    container.on('click', '.node .deleteIcon', () => deleteNode(push))

    container.on('mouseover', '.node', (e) => hoverNode(e.target, push))

    container.on('mouseout', '.node', (e) => unhoverNode(e.target, push))

    container.on('input', '.node .editInput', (e) => updateText(e.target, push))

    component.emitter
      .on('dragging', (e) => push(
        Object.assign({
          target: target.LAYOUT_NODE,
          type: actionType.DRAG
        }, e)
      ))
  }
}

function isEditIcon(el) {
  return isIcon(el, 'editIcon')
}

function isDeleteIcon(el) {
  return isIcon(el, 'deleteIcon')
}

function isIcon(el, className) {
  // delete icon has children node
  // ex: <div class="deleteIcon"><i class="fa fa-trash-o"></i></div>
  return el.className === className || el.parentNode.className === className
}

function selectNode(el, push) {
  // click node
  push({
    target: target.MODEL_NODE,
    type: actionType.SELECT,
    id: getNodeEvenWhenClickChildren(el).id
  })
}

function startEdit(push) {
  // Push an action to the model to get current texte value.
  push({
    target: target.MODEL,
    type: actionType.START_EDIT
  })
}

function deleteNode(push) {
  push({
    target: target.MODEL,
    type: actionType.DELETE
  })
}

function hoverNode(el, push) {
  push({
    target: target.MODEL_NODE,
    type: actionType.HOVER,
    id: getNodeEvenWhenClickChildren(el).id
  })
}

function unhoverNode(el, push) {
  push({
    target: target.MODEL_NODE,
    type: actionType.UNHOVER,
    id: getNodeEvenWhenClickChildren(el).id
  })
}

function updateText(el, push) {
  push({
    target: target.MODEL_NODE,
    type: actionType.UPDATE_TEXT,
    id: getNodeEvenWhenClickChildren(el).id,
    text: el.value
  })
}

// Even when you click a child element, you also get the element of the node.
function getNodeEvenWhenClickChildren(el) {
  const node = el.closest('.node')

  console.assert(node, 'node is not found', el)
  return node
}
