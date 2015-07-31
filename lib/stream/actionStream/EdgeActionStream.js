import {
  ActionReadable
}
from 'action-stream'
import graphComponent from '../../view/graphComponent'
import {
  actionType, target
}
from '../const'

// jsPlumb suppress exceptions.
export default class extends ActionReadable {
  constructor(selector) {
    super(selector)
    this.name = 'EdgeActionStream'
  }
  _bindComponent(selector, push) {
    let component = graphComponent(selector)

    component.instance.bind('connection', info => {
      try {
        push(Object.assign({
          target: target.MODEL_EDGE,
          type: actionType.CREATE
        }, toValue(info.connection)))
      } catch (e) {
        console.error(e, e.stack);
      }
    })

    component.instance.bind('click', c => {
      try {
        push(Object.assign({
          target: target.MODEL_EDGE,
          type: actionType.SELECT,
        }, toValue(c)))
      } catch (e) {
        console.error(e, e.stack);
      }
    })

    component.instance.bind('connectionDetached', info => {
      try {
        push({
          target: target.MODEL_EDGE,
          type: actionType.DELETE,
          sourceId: info.sourceId,
          targetId: info.targetId
        })
      } catch (e) {
        console.error(e, e.stack);
      }
    })

    component.instance.bind('connectionMoved', info => {
      try {
        push({
          target: target.MODEL_EDGE,
          type: actionType.DELETE,
          sourceId: info.originalSourceId,
          targetId: info.originalTargetId
        })
      } catch (e) {
        console.error(e, e.stack);
      }
    })

    component.emitter
      .on('connectionMouseover', c => push(Object.assign({
        target: target.MODEL_EDGE,
        type: actionType.HOVER
      }, toValue(c))))
      .on('connectionMouseout', c => push(Object.assign({
        target: target.MODEL_EDGE,
        type: actionType.UNHOVER
      }, toValue(c))))
  }
}

function toValue(connection) {
  // When an event is occurs on the label.
  if (connection.component)
    connection = connection.component

  // When an event is occurs on the endpoint.
  if (connection.connections && connection.connections[0])
    connection = connection.connections[0]

  console.assert(connection instanceof jsPlumb.Connection, 'This is not conneciton: ', connection)

  return {
    sourceId: connection.sourceId,
    targetId: connection.targetId
  }
}
