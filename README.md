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
```

Include a JavaScript.

```html
<script src="bower/grapheditor/index.js"></script>
```

Write in a html.

```html
<div class="node-editor">
  <div class="input-node">
    <label>Input Node</label><br>
    <input class="label" placeholder="label"></input>
    <input class="url" placeholder="url"></input>
    <button class="button" disabled>+</button>
  </div>
  <div class="edit-node hidden">
    <label>Edit Node</label><br>
    <input class="label" placeholder="label"></input>
    <input class="url" placeholder="url"></input>
    <button class="button" disabled>+</button>
    <button class="delete-button">delete</button>
    <button class="cancel-button">cancel</button>
  </div>
  <div class="edit-edge hidden">
    <label>Edit Edge</label><br>
    <input class="label" placeholder="label"></input>
    <input class="url" placeholder="url"></input>
    <button class="button" disabled>+</button>
    <button class="delete-button">delete</button>
    <button class="cancel-button">cancel</button>
  </div>
  <span class="warn"></span>
</div>
<div class="jsPlumb-container">
</div>
<div class="pgp hidden">
</div>
<div class="lookup">
    <button class="button">lookup all node</button>
</div>
<div class="table">
  <div class="node-table">
  </div>
  <div class="edge-table">
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
}])

// Add default edges.
editor.addEdges([{
  sourceId: 'node-1',
  targetId: 'node-2',
  label: 'path1'
}, {
  sourceId: 'node-1',
  targetId: 'node-3',
  label: 'path2'
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
