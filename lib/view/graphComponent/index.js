import {
  EventEmitter
}
from 'events'
import createNode from './createNode'
import jsPlumbOption from './jsPlumbOption'
import Callbacks from './Callbacks'
import * as node from './node'
import * as edge from './edge'

const emitter = new EventEmitter()

// To be singleton.
let instance

export default function(selector) {
  let container = document.querySelector(selector),
    callbacks = new Callbacks(emitter, container)

  if (!instance)
    instance = jsPlumb.getInstance(jsPlumbOption)

  instance.setContainer(container)

  return {
    instance: instance,
    container: container,
    emitter: emitter,
    createNode: (id, name, url) => node.create(container, instance, id, name, callbacks),
    updateNode: (id, name, url) => node.update(container, id, name),
    deleteNode: (id) => node.remove(container, id),
    moveNode: (id, x, y) => node.move(container, instance, id, x, y),
    selectNode: (id) => node.select(container, id),
    unselectNode: () => node.unselect(container),
    hoverNode: (id) => node.hover(container, id),
    unhoverNode: () => node.unhover(container),
    createEdge: (sourceId, targetId) => edge.create(
      instance,
      sourceId,
      targetId,
      callbacks.connectionMouseover,
      callbacks.connectionMouseout
    ),
    updateEdge: (sourceId, targetId, label, url) => edge.update(instance, sourceId, targetId, label, url),
    detachEdge: (connection) => edge.detach(instance, connection),
    deleteEdge: (sourceId, targetId) => edge.remove(instance, sourceId, targetId),
    selectEdge: (connection) => edge.select(container, connection),
    unselectEdge: () => edge.unselect(container),
    hoverEdge: (sourceId, targetId) => edge.hover(instance, sourceId, targetId),
    unhoverEdge: () => edge.unhover(container)
  }
}
