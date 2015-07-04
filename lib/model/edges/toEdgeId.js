export default function(action) {
  return `edge:${action.sourceId}:${action.targetId}`
}
