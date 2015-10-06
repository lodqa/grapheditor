export default function(selector) {
  let component = document.querySelector(selector)

  if (!component) {
    throw new Error(`No dom is find by selector: '${selector}'`)
  }

  return {
    setNode: (data) => setNode(component, data.list)
  }
}

function setNode(component, nodes) {
  let mappings = nodes
    .filter((node) => node.terms.length > 0)
    .reduce((ret, node) => {
      ret[node.label] = node.terms.reduce((a, b) => {
        if (b.enable) {
          a.push(b.value)
        }

        return a
      }, [])
      return ret
    }, {})

  component.innerHTML = JSON.stringify(mappings)
}
