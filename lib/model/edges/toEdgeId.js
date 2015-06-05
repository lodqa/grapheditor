export default function(nodes, action) {
  let sourceURL = nodes.get(action.sourceId).url,
    targetURL = nodes.get(action.targetId).url

  return `${sourceURL}|${targetURL}`
}
