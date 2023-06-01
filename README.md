# Demo
[demo](http://lodqa.github.io/grapheditor)

# Usage

Install by the npm.

```
npm install github:lodqa/grapheditor
```

Include a css.

```html
<link href="node_modules/graph-editor/index.css">
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.9/css/all.css" integrity="sha384-5SOiIsAziJl6AWe0HWRKTXlfcSHKmYV4RBF18PPJ173Kzn7jzMyFuTtk8JA7QQG1" crossorigin="anonymous">
```

Include a JavaScript.

```html
<script src="node_modules/graph-editor/index.js"></script>
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
## setDictionaryUrl API

Set dictionary url option used with when finding terms of label.

```js
editor.setDictionaryUrl('http://pubdictionaries.org:80/dictionaries/id_mapping?dictionaries=%5B%22qald-drugbank%22%2C%22qald-diseasome%22%2C%22qald-sider%22%5D&output_format=simple&threshold=0.5&top_n=0')
```

This API can set second dictionary url . That is for label of edges.

```js
editor.setDictionaryUrl(
  'http://pubdictionaries.org:80/dictionaries/id_mapping?dictionaries=%5B%22qald-drugbank%22%2C%22qald-diseasome%22%2C%22qald-sider%22%5D&output_format=simple&threshold=0.5&top_n=0',
  'http://pubdictionaries.org/find_ids.json?dictionary=UBERON-AE'
)
```

# For developer
## Setup

```
npm install
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
[User Acceptance Test](https://github.com/lodqa/grapheditor/wiki) (Japanese)

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
