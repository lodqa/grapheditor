export default function createHtmlElement() {
  createGrpahHtml()
  createTableHtml()
}

function createGrpahHtml() {
  document.querySelector('#graph-editor-graph').innerHTML = `
    <div class="node-editor">
      <div class="input-node">
        <input placeholder="New Node"></input>
        <button title="create" disabled><i class="fa fa-plus"></i></button> to be connected as
        <label>
          <i>chain</i><input name="create-edge" type="radio" value="chain" checked></label> or
        <label>
          <i>star</i><input name="create-edge" type="radio" value="star"/></label>.
      </div>
      <span class="message"></span>
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
