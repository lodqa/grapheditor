import {
  EventEmitter
}
from 'events'
import {
  jsPlumb
} from 'jsplumb'
import jsPlumbOption from './jsPlumbOption'
import Callbacks from './Callbacks'
import * as nodeApi from './nodeApi'
import * as edgeApi from './edgeApi'

const emitter = new EventEmitter()

// To be singleton.
let instance

export default function(selector) {
  const container = document.querySelector(selector)
  const callbacks = new Callbacks(emitter, container)

  if (!instance) {
    instance = jsPlumb.getInstance(jsPlumbOption)
  }

  instance.setContainer(container)

  return {
    instance,
    container,
    emitter,
    createNode: (id, name) => nodeApi.create(container, instance, id, name, callbacks),
    updateNode: (id, name) => nodeApi.update(container, instance, id, name),
    deleteNode: (id) => nodeApi.remove(container, id),
    moveNode: (id, x, y) => nodeApi.move(container, instance, id, x, y),
    selectNode: (id) => nodeApi.select(container, instance, id),
    startEditNode: (id, name) => nodeApi.startEdit(container, instance, id, name),
    unselectNode: () => nodeApi.unselect(container, instance),
    hoverNode: (id) => nodeApi.hover(container, id),
    unhoverNode: () => nodeApi.unhover(container),
    afterCreateEdge: (edge) => edgeApi.afterCreate(
      instance,
      edge.sourceId,
      edge.targetId,
      callbacks.connectionMouseover,
      callbacks.connectionMouseout
    ),
    createEdge: (edge) => edgeApi.create(
      instance,
      edge.sourceId,
      edge.targetId,
      edge.text,
      callbacks.connectionMouseover,
      callbacks.connectionMouseout
    ),
    updateEdge: (edge) => edgeApi.update(instance, edge.sourceId, edge.targetId, edge.text),
    deleteEdge: (edge) => edgeApi.remove(instance, edge.sourceId, edge.targetId),
    selectEdge: (edge) => edgeApi.select(container, instance, edge.sourceId, edge.targetId),
    startEditEdge: (edge) => edgeApi.startEdit(container, instance, edge.sourceId, edge.targetId, edge.text),
    unselectEdge: () => edgeApi.unselect(container, instance),
    hoverEdge: (edge) => edgeApi.hover(instance, edge.sourceId, edge.targetId),
    unhoverEdge: () => edgeApi.unhover(container),
    toEdgeValue: edgeApi.toEdgeValue
  }
}
