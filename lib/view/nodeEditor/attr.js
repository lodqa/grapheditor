export default function(name) {
  return {
    set: (component, url) => {
      component.setAttribute(name, url || '')
    },
    get: (component) => {
      return component.getAttribute(name)
    },
    del: (component) => {
      component.removeAttribute(name)
    }
  }
}
