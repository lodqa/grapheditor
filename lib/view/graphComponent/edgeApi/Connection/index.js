import toLabelParam from '../toLabelParam'
import getNameSpan from '../getNameSpan'
import toConnection from './toConnection'
import getEdgeLabel from './getEdgeLabel'
import addClass from './addClass'
import switchOverlayToLabel from './switchOverlayToLabel'
import toEditParam from './toEditParam'

// A wrapper class to utilize 'jsPlumb connection' API
export default class {
  constructor(instance, sourceId, targetId) {
    this.instance = instance

    if (targetId) {
      this.connection = toConnection(instance, sourceId, targetId)
    } else {
      // The second parameter is connection when number of parameters are two.
      const connection = sourceId

      this.connection = connection
    }
  }

  addLabelOverlay() {
    // Add the label overlay unless it
    // Because a new edge that created by  user drag and drop end point in the graph has no label overlay.
    const labelOverlay = this.connection.getOverlay('label')

    if (!labelOverlay) {
      this.connection.addOverlay(toLabelParam(''))
    }
  }

  bindHoverEventhandlers(mouseover, mouseout) {
    // Bind hover events handlers a new edge.
    this.connection.bind('mouseover', mouseover)
    this.connection.bind('mouseout', mouseout)
  }

  updateText(label) {
    const labelOverlay = this.connection.getOverlay('label')

    // The labelOverlay does not exists during edit
    if (!labelOverlay) {
      return
    }

    if (label) {
      getNameSpan(labelOverlay).innerHTML = label
      getEdgeLabel(labelOverlay)
        .classList.remove('no-text')
    } else {
      getEdgeLabel(labelOverlay)
        .classList.add('no-text')
    }
  }

  remove() {
    this.instance.deleteConnection(this.connection)
  }

  select() {
    addClass(this.connection, 'selected')
  }

  unselect() {
    const overlay = this.connection.getOverlay('edit')

    if (overlay) {
      switchOverlayToLabel(this.connection, false)
    }
  }

  startEdit(label = '') {
    let editOverlay = this.connection.getOverlay('edit')

    // Create a overlay for  editing if it does not exists
    if (!editOverlay) {
      editOverlay = this.connection.addOverlay(toEditParam(label))
    }

    // This method is called when the edge is clicked even if during editing.
    // At that time the input element lose focus once.
    editOverlay.canvas.querySelector('input').focus()
    this.connection.removeOverlay('label')
  }

  endEdit() {
    switchOverlayToLabel(this.connection, true)
  }

  hover() {
    // Connections cannot be get when they are being dragging.
    if (!this.connection) {
      return
    }

    addClass(this.connection, 'hover')
  }
}
