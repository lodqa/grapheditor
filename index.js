import {
  Writable,
  Readable,
  Transform
}
from 'stream'

import extend from 'xtend'

const option = {
  objectMode: true
}

class InputNodeControllerStream extends Readable {
  constructor(component) {
    super(option)

    component.button.addEventListener('click', e => this.push(
      extend(
        component.value, {
          type: 'node',
          action: 'add'
        }
      )
    ))

    let inputHandler = e => this.push({
      type: 'view',
      action: 'input'
    })

    component.label.addEventListener('input', inputHandler)
    component.url.addEventListener('input', inputHandler)
  }
  _read() {}
}

class FunnelStream extends Transform {
  constructor() {
    super(option)
  }
  _transform(action, encoding, done) {
    this.push(action)
    done()
  }
}

class ModelStream extends Transform {
  constructor() {
    super(option)
    this._nodes = new Map()
  }
  _transform(action, encoding, done) {
    if (action.type === 'node') {
      if (!this._validateNode(action))
        return;

      this._nodes.set(action.url, action.label)
    }

    this.push(action)
    done()
  }
  _validateNode(action) {
    return action.url && !this._nodes.has(action.url)
  }
}

class GraphViewStream extends Transform {
  constructor() {
    super(option)

    this._container = document.querySelector('#jsPlumb-container')
    this._initJsPlumb()
  }
  _transform(action, encoding, done) {
    if (action.type === 'node') {
      this._createNode(this._instance, this._container, action.url, action.label)
    }

    this.push(action)
    done()
  }
  _initJsPlumb() {
    this._instance = jsPlumb.getInstance({
      Endpoint: ["Dot", {
        radius: 2
      }],
      HoverPaintStyle: {
        strokeStyle: "#1e8151",
        lineWidth: 2
      },
      ConnectionOverlays: [
        ["Arrow", {
          location: 1,
          id: "arrow",
          length: 14,
          foldback: 0.8
        }],
        ["Label", {
          label: "FOO",
          id: "label",
          cssClass: "aLabel"
        }]
      ],
      Container: "jsPlumb-container"
    });
  }
  _createNode(instance, container, id, name) {
    container.insertAdjacentHTML('beforeend', `
    <div class="w" id="${id}">${name}
        <div class="ep"></div>
    </div>`)

    let el = container.querySelector(`#${id}`)

    instance
      .draggable(el)
      .makeSource(el, {
        filter: ".ep",
        anchor: "Continuous",
        connector: ["StateMachine", {
          curviness: 20
        }],
        connectorStyle: {
          strokeStyle: "#5c96bc",
          lineWidth: 2,
          outlineColor: "transparent",
          outlineWidth: 4
        }
      })
      .makeTarget(el, {
        dropOptions: {
          hoverClass: "dragHover"
        },
        anchor: "Continuous",
        allowLoopback: true
      });
  }
}

class InputNodeViewStream extends Transform {
  constructor(component) {
    super(option)

    this._component = component
  }
  _transform(action, encoding, done) {
    if (action.type === 'node') {
      this._component.reset()
    }

    if (action.type === 'view') {
      this._component.updateDisable()
    }

    this.push(action)
    done()
  }
}

let funnel = new FunnelStream()

let inputNodeComponent = function(selector) {
  let component = document.querySelector(selector),
    label = component.querySelector('.label'),
    url = component.querySelector('.url'),
    button = component.querySelector('.button')

  return {
    label: label,
    url: url,
    button: button,
    get value() {
      return {
        label: label.value,
        url: url.value
      }
    },
    reset: () => {
      label.value = ''
      url.value = ''
      button.disabled = true
    },
    updateDisable: () => button.disabled = !label.value || !url.value
  }
}('#input-node')

new InputNodeControllerStream(inputNodeComponent)
  .pipe(funnel)

dispatch
  .pipe(new ModelStream)
  .pipe(new GraphViewStream)
  .pipe(new InputNodeViewStream(inputNodeComponent))
