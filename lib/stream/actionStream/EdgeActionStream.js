import delegate from 'dom-delegate'
import {
  ActionReadable
}
from 'action-stream'
import graphComponent from '../../view/graphComponent'
import {
  actionType,
  target
}
from '../const'

// jsPlumb suppress exceptions.
export default class extends ActionReadable {
  constructor(selector) {
    super(selector)
    this.name = 'EdgeActionStream'
  }
  _bindComponent(selector, push) {
    const component = graphComponent(selector)
    const container = delegate(component.container)

    component.instance.bind('connection', (info) => {
      try {
        // Send an action with text of the connection.
        // Because connections are created by the jsPlumb and then are added to the model.
        // It is why?
        // The jsPlumb provide a function to create a connection by drag and drop.
        // But it does not provide fook point or event of drag and drop.
        // We cannot distinguish an connection event by drag and drop and from another by api.
        push(Object.assign({
          target: target.MODEL_EDGE,
          type: actionType.CREATE
        }, component.toEdgeValue(info.connection, true)))
      } catch (e) {
        console.error(e, e.stack)
      }
    })

    component.instance.bind('click', (c) => {
      try {
        push(Object.assign({
          target: target.MODEL_EDGE,
          type: actionType.SELECT
        }, component.toEdgeValue(c)))
      } catch (e) {
        console.error(e, e.stack)
      }
    })

    component.instance.bind('endpointClick', (endpoint) => {
      try {
        push(Object.assign({
          target: target.MODEL_EDGE,
          type: actionType.SELECT
        }, toEdgeValueFromEndpoint(component, endpoint)))
      } catch (e) {
        console.error(e, e.stack)
      }
    })

    component.instance.bind('connectionDetached', (info) => {
      try {
        push({
          target: target.MODEL_EDGE,
          type: actionType.DELETE,
          sourceId: info.sourceId,
          targetId: info.targetId
        })
      } catch (e) {
        console.error(e, e.stack)
      }
    })

    // An connection event for the new edge is fired together with this event .
    // The new edge is created responding to that event.
    // Responsibility of this event is only deletion of the old edge.
    component.instance.bind('connectionMoved', (info) => {
      try {
        push({
          target: target.MODEL_EDGE,
          type: actionType.DELETE,
          sourceId: info.originalSourceId,
          targetId: info.originalTargetId
        })
      } catch (e) {
        console.error(e, e.stack)
      }
    })

    // Text in the input element in order to edit was changed.
    container.on('input', '.edgeLabel input', (e) => {
      push({
        target: target.MODEL_EDGE,
        type: actionType.UPDATE_TEXT,
        text: e.target.value
      })
    })

    component.emitter
      .on('connectionMouseover', (c) => push(Object.assign({
        target: target.MODEL_EDGE,
        type: actionType.HOVER
      }, component.toEdgeValue(c))))
      .on('connectionMouseout', (c) => push(Object.assign({
        target: target.MODEL_EDGE,
        type: actionType.UNHOVER
      }, component.toEdgeValue(c))))
  }
}

function toEdgeValueFromEndpoint(component, endpoint) {
  return component.toEdgeValue(endpoint.connections[0])
}
