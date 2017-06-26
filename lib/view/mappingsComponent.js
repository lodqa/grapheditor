export default function(selector) {
  const component = document.querySelector(selector)
  let nodes = []
  let edges = []

  if (!component) {
    throw new Error(`No dom is find by selector: '${selector}'`)
  }

  return {
    setNode: (data) => {
      nodes = data.list
      updateDisplay(component, nodes.concat(edges))
    },
    setEdge: (data) => {
      edges = data
      updateDisplay(component, nodes.concat(edges))
    }
  }
}

function updateDisplay(component, texts) {
  const mappings = texts
    .filter((text) => text.terms.length > 0)
    .reduce((ret, text) => {
      ret[text.text] = text.terms.reduce((a, b) => {
        if (b.enable) {
          a.push(b.value)
        }

        return a
      }, [])
      return ret
    }, {})

  component.innerHTML = JSON.stringify(mappings)
}
