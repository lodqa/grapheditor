# Demo
[demo](http://lodqa.github.io/grapheditor)

# Usage

Install by the bower.

```
bower install grapheditor
```

Include a css.

```html
<link href="bower/grapheditor/index.css">
<link rel="stylesheet" href="bower_components/font-awesome/css/font-awesome.css">
```

Include a JavaScript.

```html
<script src="bower_components/jsplumb/dist/js/dom.jsPlumb-1.7.5.js"></script>
<script src="bower_components/js-polyfills/keyboard.js"></script>
<script src="bower/grapheditor/index.js"></script>
```

Write in a html.

```html
<div class="node-editor">
  <div class="input-node">
    <input class="label" placeholder="New Node"></input>
    <button class="button" disabled title="create"><i class="fa fa-plus"></i></button> to be connected as
    <label>
      <i>chain</i><input checked/ name="create-edge" type="radio" value="chain"></label> or
    <label>
      <i>star</i><input name="create-edge" type="radio" value="star"/></label>.
  </div>
  <div class="edit-edge hidden">
    <label>Delete Edge</label>
    <button class="delete-button" title="delete"><i class="fa fa-trash-o"></i></button>
  </div>
  <span class="warn"></span>
</div>
<div class="jsPlumb-container">
</div>
<div class="pgp hidden">
</div>
<div class="table">
  <div class="node-table">
  </div>
</div>
<div class="mappings hidden">
</div>
```

Write in JavaScript.

```js
var editor = graphEditor('http://localhost:9292/lookup') // Set API URL to lookup term of labels.

// Add default nodes.
editor.addNodes([{
  id: 'node-1',
  label: 'genes'
}, {
  id: 'node-2',
  label: 'alzheimer disease'
}, {
  id: 'node-3',
  label: 'bing'
}, {
  id: 'node-4',
  label: 'bang'
}, {
  id: 'node-5',
  label: 'bong'
}, {
  id: 'node-6',
  label: 'song',
  createEdge: 'chain'
}])
```


# For developer
## Setup

```
npm install
npm install -g bower
bower install
```

## Build
```
npm run start
```

## Run
```
open index.html
```

## Test
[User Acceptance Test](https://github.com/lodqa/grapheditor/wiki)

## Commands for Development
Watch JavaScript files.

```
npm run watch
```

Compile less files.

```
npm run less
```

Start a stub server.

```
npm run stub
```

See other commands.

```
npm run
```
