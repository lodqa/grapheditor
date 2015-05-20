import graphComponent from '../../view/graphComponent'
import ActionReadable from '../ActionReadable'

const TARGET_EDGE = 'edge'

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

    component.instance.bind('connection', info => this.push({
      target: TARGET_EDGE,
      type: 'afterCreate',
      connection: info.connection,
      sourceId: info.sourceId,
      targetId: info.targetId,
      label: info.connection.getOverlay("label")
    }))

    component.instance.bind('click', c => this.push({
      target: TARGET_EDGE,
      type: 'select',
      connection: c,
      sourceId: c.sourceId,
      targetId: c.targetId,
      label: c.getOverlay("label")
    }))

    component.instance.bind('dblclick', c => this.push({
      target: TARGET_EDGE,
      type: 'edit',
      connection: c
    }))
  }
}
