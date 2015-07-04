export default function(name) {
  return {
    set: function(component, url) {
      component.setAttribute(name, url || '')
    },
    get: function(component) {
      return component.getAttribute(name)
    },
    del: function (component) {
      component.removeAttribute(name)
    }
  }
}
