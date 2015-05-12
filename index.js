import {
  Writable,
  Readable,
  Transform
}
from 'stream'

const option = {
  objectMode: true
}

class InputNodeControllerStream extends Readable {
  constructor(selector) {
    super(option)

    let component = document.querySelector(selector),
      label = component.querySelector('.label'),
      url = component.querySelector('.url'),
      button = component.querySelector('.button')

    button.addEventListener('click', e => this.push({
      type: 'node',
      action: 'add',
      label: label.value,
      url: url.value
    }))

    let inputHandler = e => this.push({
      type: 'view',
      action: 'input',
      label: label.value,
      url: url.value
    })

    label.addEventListener('input', inputHandler)
    url.addEventListener('input', inputHandler)
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
  constructor(selector) {
    super(option)
    let component = document.querySelector(selector)

    this._label = component.querySelector('.label')
    this._url = component.querySelector('.url')
    this._button = component.querySelector('.button')
  }
  _transform(action, encoding, done) {
    if (action.type === 'node') {
      this._label.value = ''
      this._url.value = ''
      this._button.disabled = true
    }

    if (action.type === 'view') {
      this._button.disabled = !action.label || !action.url
    }

    this.push(action)
    done()
  }
}

let dispatch = new FunnelStream()

new InputNodeControllerStream('#input-node')
  .pipe(dispatch)

dispatch
  .pipe(new ModelStream)
  .pipe(new GraphViewStream)
  .pipe(new InputNodeViewStream('#input-node'))
