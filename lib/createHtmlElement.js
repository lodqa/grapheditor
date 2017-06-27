export default function createHtmlElement() {
  createGrpahHtml()
  createTableHtml()
}

function createGrpahHtml() {
  document.querySelector('#graph-editor-graph').innerHTML = `
    <div class="node-editor">
      <div>
        <button class="add-empty-node" title="create empty node">Add Empty Node</button>
      </div>
    </div>
    <div class="jsPlumb-container">
      <span class="placeholder">Compose a  graph.</span>
    </div>
    <div class="pgp hidden">
    </div>
  `
}

function createTableHtml() {
  document.querySelector('#graph-editor-table').innerHTML = `
    <div class="table">
      <span class="placeholder">There is no graph yet.</span>
      <span class="message"></span>
      <div class="node-table"></div>
      <div class="edge-table"></div>
    </div>
    <div class="mappings hidden">
    </div>
  `
}
