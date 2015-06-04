import delegate from 'dom-delegate'
import ActionReadable from '../ActionReadable'
import actionType from '../actionType'
import graphComponent from '../../view/graphComponent'

const TARGET_NODE = 'node'

export default class extends ActionReadable {
  _bindComponent(selector, push) {
    let component = graphComponent(selector),
      container = delegate(component.container)

    container.on('click', '.node', e => {
      if (e.target.className === 'endPoint')
        return

      push({
        target: TARGET_NODE,
        type: actionType.SELECT,
        id: e.target.id
      })
    })
  }
}
