export default function(instance, sourceId, targetId) {
  console.assert(sourceId, 'sourceId is required.')
  console.assert(targetId, 'targetId is required.')

  const connections = instance.getConnections({
    source: sourceId,
    target: targetId
  })
  const connection = connections[0]

  return connection
}
