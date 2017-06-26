const pgp = {} // The output data.
let pgpIdMap // The map of original node id and id on the pgg.

export default function(selector) {
  const component = document.querySelector(selector)

  if (!component) {
    throw new Error(`No dom is find by selector: '${selector}'`)
  }

  return {
    setNode: (data) => setNode(component, data.list, data.focus),
    setEdge: (edges) => setEdge(component, edges)
  }
}

function setNode(component, nodes, focus) {
  pgpIdMap = getPgpIdMap(nodes)

  pgp.nodes = getNodesForPgp(nodes)
  pgp.focus = pgpIdMap.get(focus)

  update(component, pgp)
}

function setEdge(component, edges) {
  pgp.edges = edges.map((e) => {
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

  update(component, pgp)
}

function update(component, pgp) {
  component.innerHTML = JSON.stringify(pgp, null, 2)
}

function getNodesForPgp(nodes) {
  return nodes.reduce((ret, node) => {
    ret[pgpIdMap.get(node.id)] = {
      text: node.text
    }

    return ret
  }, {})
}

function getPgpIdMap(nodes) {
  return new Map(
    nodes.reduce((ret, node, index) => ret.concat([
      [node.id, `t${index + 1}`]
    ]), [])
  )
}
