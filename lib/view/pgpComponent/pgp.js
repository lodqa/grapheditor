export default class {
  get json() {
    const data = {}
    const pgpIdMap = toPgpIdMap(this.nodes)

    data.nodes = convertToNodesForPgp(pgpIdMap, this.nodes)
    data.edges = convertToEdgesForPgp(pgpIdMap, this.edges || [])
    // The focus is id. format it.
    data.focus = pgpIdMap.get(this.focus)

    return data
  }
}

// Create a map for converting id of nodes to format that starts with 't' and is followed number.
function toPgpIdMap(nodes) {
  return new Map(
    nodes.reduce((ret, node, index) => ret.concat([
      [node.id, `t${index + 1}`]
    ]), [])
  )
}

// Convert nodes array to hash, and format its id.
function convertToNodesForPgp(pgpIdMap, nodes) {
  return nodes.reduce((ret, node) => {
    ret[pgpIdMap.get(node.id)] = {
      text: node.text
    }

    return ret
  }, {})
}

// Format edges
function convertToEdgesForPgp(pgpIdMap, edges) {
  return edges.map((e) => {
    if (e.text) {
      return {
        object: pgpIdMap.get(e.targetId),
        subject: pgpIdMap.get(e.sourceId),
        text: e.text
      }
    }

    return {
      object: pgpIdMap.get(e.targetId),
      subject: pgpIdMap.get(e.sourceId)
    }
  })
}
