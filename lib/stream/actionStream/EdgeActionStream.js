import extend from 'xtend'
import graphComponent from '../../view/graphComponent'
import ActionReadable from '../ActionReadable'

const TARGET_EDGE = 'edge'

// jsPlumb suppress exceptions.
export default class extends ActionReadable {
  constructor(selector) {
    super()

    let component = graphComponent(selector)

    component.instance.bind('beforeDrop', info => this.push({
      target: TARGET_EDGE,
      type: 'beforeCreate',
      connection: info.connection,
      sourceId: info.sourceId,
      targetId: info.targetId
    }))

    component.instance.bind('connection', info => {
      try {
        this.push(extend({
          target: TARGET_EDGE,
          type: 'afterCreate'
        }, toValue(info.connection)))
      } catch (e) {
        console.error(e, e.stack);
      }
    })

    component.instance.bind('click', c => {
      try {
        this.push(extend({
          target: TARGET_EDGE,
          type: 'select',
        }, toValue(c)))
      } catch (e) {
        console.error(e, e.stack);
      }
    })

    component.instance.bind('dblclick', c => this.push({
      target: TARGET_EDGE,
      type: 'edit',
      connection: c
    }))
  }
}

function toValue(connection) {
  return {
    connection: connection,
    sourceId: connection.sourceId,
    targetId: connection.targetId,
    label: connection.getOverlay("label").label,
    url: connection.getParameter('url')
  }
}
