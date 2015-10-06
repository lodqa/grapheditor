export default function(component, target, type, push) {
  push(
    Object.assign({
      target,
      type
    },
      component.value
    )
  )
}
