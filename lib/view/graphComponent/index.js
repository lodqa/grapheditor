import {
  EventEmitter
}
from 'events'
import createNode from './createNode'
import jsPlumbOption from './jsPlumbOption'
import Callbacks from './Callbacks'
import * as node from './node'
import * as edge from './edge'

const instance = jsPlumb.getInstance(jsPlumbOption),
  emitter = new EventEmitter()

export default function(selector) {
  let container = document.querySelector(selector),
    callbacks = new Callbacks(emitter, container)

  instance.setContainer(container)

  return {
    instance: instance,
    container: container,
    emitter: emitter,
    createNode: (id, name, url) => node.createNode(container, instance, id, name, url, callbacks),
    updateNode: (id, name, url) => node.updateNode(container, id, name, url),
    deleteNode: (id) => node.deleteNode(container, id),
    moveNode: (id, x, y) => node.moveNode(container, instance, id, x, y),
    selectNode: (id) => node.selectNode(container, id),
    unselectNode: () => node.unselectNode(container),
    hoverNode: (sourceId, targetId) => node.hoverNode(instance, sourceId, targetId),
    unhoverNode: () => node.unhoverNode(container),
    createEdge: (sourceId, targetId, label, url) => edge.createEdge(
      instance,
      sourceId,
      targetId,
      label,
      url,
      callbacks.connectionMouseover,
      callbacks.connectionMouseout
    ),
    updateEdge: (sourceId, targetId, label, url) => edge.updateEdge(instance, sourceId, targetId, label, url),
    detachEdge: (connection) => edge.detachEdge(instance, connection),
    deleteEdge: (sourceId, targetId) => edge.deleteEdge(instance, sourceId, targetId),
    selectEdge: (connection) => edge.selectEdge(container, connection),
    unselectEdge: () => edge.unselectEdge(container)
  }
}