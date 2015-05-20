import extend from 'xtend'

export default function(component, type, stream) {
  stream.push(
    extend({
        target: 'node',
        type: type
      },
      component.value
    )
  )
}
