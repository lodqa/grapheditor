export default function(nodes, action) {
  let sourceUrl = action.sourceUrl || nodes.get(action.sourceId).url,
    targetUrl = action.targetUrl || nodes.get(action.targetId).url

  return `${sourceUrl}|${targetUrl}`
}
