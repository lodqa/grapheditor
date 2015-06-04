import extend from 'xtend'
import graphComponent from '../../view/graphComponent'
import ActionReadable from '../ActionReadable'
import {
  actionType, target
}
from '../const'

// jsPlumb suppress exceptions.
export default class extends ActionReadable {
  _bindComponent(selector, push) {
    let component = graphComponent(selector)

    component.instance.bind('connection', info => {
      try {
        push(extend({
          target: target.MODEL_EDGE,
          type: actionType.AFTER_CREATE
        }, toValue(info.connection)))
      } catch (e) {
        console.error(e, e.stack);
      }
    })

    component.instance.bind('click', c => {
      try {
        push(extend({
          target: target.MODEL_EDGE,
          type: actionType.SELECT,
        }, toValue(c)))
      } catch (e) {
        console.error(e, e.stack);
      }
    })
  }
}

function toValue(connection) {
  let labelOverlay = connection.getOverlay("label")

  return {
    connection: connection,
    sourceId: connection.sourceId,
    targetId: connection.targetId,
    label: labelOverlay ? labelOverlay.label : '',
    url: connection.getParameter('url')
  }
}
