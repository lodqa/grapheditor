import extend from 'xtend'
import graphComponent from '../../view/graphComponent'
import ActionReadable from '../ActionReadable'
import actionType from '../actionType'

const TARGET_EDGE = 'edge'

// jsPlumb suppress exceptions.
export default class extends ActionReadable {
  _bindComponent(selector, push) {
    let component = graphComponent(selector)

    component.instance.bind('beforeDrop', info => push({
      target: TARGET_EDGE,
      type: 'beforeCreate',
      connection: info.connection,
      sourceId: info.sourceId,
      targetId: info.targetId
    }))

    component.instance.bind('connection', info => {
      try {
        push(extend({
          target: TARGET_EDGE,
          type: 'afterCreate'
        }, toValue(info.connection)))
      } catch (e) {
        console.error(e, e.stack);
      }
    })

    component.instance.bind('click', c => {
      try {
        push(extend({
          target: TARGET_EDGE,
          type: actionType.SELECT,
        }, toValue(c)))
      } catch (e) {
        console.error(e, e.stack);
      }
    })

    component.instance.bind('dblclick', c => push({
      target: TARGET_EDGE,
      type: 'edit',
      connection: c
    }))
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
