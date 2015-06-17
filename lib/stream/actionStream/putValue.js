import extend from 'xtend'

export default function(component, target, type, push) {
  push(
    extend({
        target: target,
        type: type
      },
      component.value
    )
  )
}
