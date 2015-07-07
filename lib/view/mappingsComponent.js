export default function(selector) {
  let component = document.querySelector(selector)

  if (!component)
    throw new Error(`No dom is find by selector: '${selector}'`);

  return {
    setNode: (nodes) => setNode(component, nodes)
  }
}

function setNode(component, nodes) {
  let mappings = nodes.reduce((ret, node) => {
    ret[node.label] = node.url
    return ret
  }, {})

  component.innerHTML = JSON.stringify(mappings)
}
