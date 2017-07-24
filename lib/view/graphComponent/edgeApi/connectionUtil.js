import toLabelParam from './toLabelParam'
import Connection from './Connection'

export {
  register,
  unselectAll
}

function register(instance, sourceId, targetId, label = '') {
  // Check presence of nodes before call a jsPlumb api, for logging detail information.
  // This check is done in jsPlumb, too.
  const source = instance.getElement(sourceId)
  const target = instance.getElement(targetId)

  console.assert(source, 'the source is not exists :', sourceId)
  console.assert(target, 'the target is not exists :', targetId)

  const connParams = {
    source,
    target,
    type: 'basic',
    overlays: [toLabelParam(label)]
  }

  instance.connect(connParams)
}

function unselectAll(instance) {
  instance.getAllConnections()
    .forEach((c) => new Connection(instance, c).unselect)
}
