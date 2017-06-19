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
<script src="bower/grapheditor/index.js"></script>
```

Write in a html.

```html
<div id="graph-editor-graph"></div>
<div id="graph-editor-table"></div>
```

Write in JavaScript.

```js
var editor = graphEditor('http://localhost:9292/lookup') // Set API URL to find terms of labels.

// Add pgp.
editor.addPgp({
  "nodes": {
    "node-1": {
      "text": "genes"
    },
    "node-2": {
      "text": "alzheimer disease"
    },
    "node-3": {
      "text": "bing"
    },
    "node-4": {
      "text": "bang"
    },
    "node-5": {
      "text": "bong"
    },
    "node-6": {
      "text": "song"
    }
  },
  "edges": [{
    "object": "node-2",
    "subject": "node-1"
  }, {
    "object": "node-3",
    "subject": "node-1"
  }, {
    "object": "node-4",
    "subject": "node-1"
  }, {
    "object": "node-5",
    "subject": "node-1"
  }, {
    "object": "node-6",
    "subject": "node-5"
  }],
  "focus": "node-2"
})
```
## other API
```js
editor.setDictionaryUrl('http://pubdictionaries.org:80/dictionaries/id_mapping?dictionaries=%5B%22qald-drugbank%22%2C%22qald-diseasome%22%2C%22qald-sider%22%5D&output_format=simple&threshold=0.5&top_n=0')
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
