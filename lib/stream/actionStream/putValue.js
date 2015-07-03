export default function(component, target, type, push) {
  push(
    Object.assign({
        target: target,
        type: type
      },
      component.value
    )
  )
}
