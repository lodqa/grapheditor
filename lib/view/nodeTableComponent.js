export default function(selector) {
  let component = document.querySelector(selector)
  if (!component)
    throw new Error(`No dom is find by selector: '${selector}'`);

  return {
    set: (json) => component.innerHTML = JSON.stringify(json)
  }
}
