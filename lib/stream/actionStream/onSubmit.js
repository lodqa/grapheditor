import extend from 'xtend'

export default function(component,target, type, stream) {
  stream.push(
    extend({
        target: target,
        type: type
      },
      component.value
    )
  )
}
